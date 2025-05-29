
using System.Text;
using AutoMapper;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using NetKubernetes.Data;
using NetKubernetes.Data.Inmuebles;
using NetKubernetes.Data.Usuarios;
using NetKubernetes.Middleware;
using NetKubernetes.Models;
using NetKubernetes.Profiles;
using NetKubernetes.Token;;

var builder = WebApplication.CreateBuilder(args);


builder.Services.Configure<IdentityOptions>(options =>
{
    options.Password.RequireDigit = false;
    options.Password.RequiredLength = 6;
    options.Password.RequireNonAlphanumeric = false; // <- aquí
    options.Password.RequireUppercase = false;
    options.Password.RequireLowercase = false;
});
#region Conexio Configuracion Base 
 builder.Services.AddDbContext<AppDbContext>(options => 
 {
     //Logs de informacion de todo comando que se ejecuta en SQL
     options.LogTo
     (
         Console.WriteLine, 
         new []  {DbLoggerCategory.Database.Command.Name}, 
         LogLevel.Information)
     .EnableSensitiveDataLogging();
     options.UseSqlServer(builder.Configuration.GetConnectionString("SQLServerConnection")!);

 });
/*
var objConnectionMysqlString = builder.Configuration.GetConnectionString("MySQLConnection");
builder.Services.AddDbContext<AppDbContext>(objOptions =>
{
    objOptions.UseMySql(objConnectionMysqlString, ServerVersion.AutoDetect(objConnectionMysqlString));
    //Logs de informacion de todo comando que se ejecuta en SQL
    objOptions.LogTo
    (
        Console.WriteLine,
        new[] { DbLoggerCategory.Database.Command.Name },
        LogLevel.Information)
    .EnableSensitiveDataLogging();
});*/
#endregion

// Add services to the container.
builder.Services.AddScoped<IInmuebleRepository, InmuebleRepository>();
#region Configuracion de Autenticacion
//Excluir ciertos usuarios por permisos de Seguridad
builder.Services.AddControllers( obj => {
    var objPolicy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();
    obj.Filters.Add(new AuthorizeFilter(objPolicy));
});
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
#endregion

#region Configuracion de Mappeado Objetos
//Agregando referencia mapper para instanciar objetos
var objMapperConfig = new MapperConfiguration(objCfg => 
{
    objCfg.AddProfile(new InmuebleProfile());

});
IMapper objMapper = objMapperConfig.CreateMapper();
builder.Services.AddSingleton(objMapper);
#endregion

#region Configuracion de Seguridad
var objBuilderSecurity = builder.Services.AddIdentityCore<Usuario>();
var objIdentityBuilder = new IdentityBuilder(objBuilderSecurity.UserType, objBuilderSecurity.Services);
objIdentityBuilder.AddEntityFrameworkStores<AppDbContext>();
objIdentityBuilder.AddSignInManager<SignInManager<Usuario>>();
builder.Services.AddSingleton<ISystemClock, SystemClock>();
builder.Services.AddScoped<IJwtGenerador, JwtGenerador>();
builder.Services.AddScoped<IUsuarioSesion, UsuarioSesion>();
builder.Services.AddScoped<IUsuarioRepository, UsuarioRepository>();
var objKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("EstaEsUnaClaveMuyLargaParaElTokenQueTiene64CaracteresExactamente"));
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(objOptions => 
                {
                    objOptions.TokenValidationParameters = new TokenValidationParameters
                    {
                        //valida la llave
                        ValidateIssuerSigningKey = true,
                        //objeto clave
                        IssuerSigningKey = objKey,
                        //Cualquier cliente puede enviar Request
                        ValidateAudience = false,
                        //Cualquier cliente puede recibir el token
                        ValidateIssuer = false
                    };
                });
builder.Services.AddCors(obj => 
obj.AddPolicy("CorsApp", builder =>{
    //si quiero solo aceptar de cualquier peticion desde una IP especifica
    builder.WithOrigins("*").AllowAnyMethod().AllowAnyHeader();

}
)
);
#endregion

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseMiddleware<ManagerMiddleware>();
app.UseCors("CorsApp");

app.UseAuthentication();

//app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

#region Migracion de la base de datos
using (var objAmbiente = app.Services.CreateScope())
{
    var services = objAmbiente.ServiceProvider;
    try {
        var objUserManager = services.GetRequiredService<UserManager<Usuario>>();
        var objContext = services.GetRequiredService<AppDbContext>();
        await objContext.Database.MigrateAsync();
        await LoadDatabase.InsertarData(objContext, objUserManager);
    var context = services.GetRequiredService<AppDbContext>();
    context.Database.Migrate();
    }
    catch(Exception objError)
    {
        var objLogger = services.GetRequiredService<ILogger<Program>>();
        objLogger.LogError(objError, "Error en la migracion de la base de datos");
    }

}
#endregion 
app.Run();
