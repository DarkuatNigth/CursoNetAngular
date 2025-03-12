using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using NetKubernetes.Dtos.UsuarioDtos;
using NetKubernetes.Middleware;
using NetKubernetes.Models;
using NetKubernetes.Token;

namespace  NetKubernetes.Data.Usuarios;

public class UsuarioRepository : IUsuarioRepository
{
    private readonly ILogger<UsuarioRepository> _objLogger;
    private readonly UserManager<Usuario> _objUserManager;
    private readonly SignInManager<Usuario> _objSignInManager;
    private readonly IJwtGenerador _objJwtGenerador;
    private readonly AppDbContext _objContext;
    private readonly IUsuarioSesion _objUsuarioSesion;

    public UsuarioRepository(ILogger<UsuarioRepository> objLogger, 
                            UserManager<Usuario> objUserManager,
                            SignInManager<Usuario> objSignInManager,
                            IJwtGenerador objJwtGenerador,
                            AppDbContext objContext,
                            IUsuarioSesion objUsuarioSesion)
    {
        _objLogger = objLogger;
        _objUserManager = objUserManager;
        _objSignInManager = objSignInManager;
        _objJwtGenerador = objJwtGenerador;
        _objContext = objContext;
        _objUsuarioSesion = objUsuarioSesion;
    }

    private UsuarioResponseDto TransformarUsuarioToUsuarioResponseDto(Usuario objUsuario)
    {
        
        try{
            return new UsuarioResponseDto
            (
                objUsuario.Id,
                objUsuario.strNombre!,
                objUsuario.strApellido!,
                _objJwtGenerador.CrearToken(objUsuario),
                objUsuario.UserName!,
                objUsuario.Email!,
                objUsuario.strTelefono!
            );
        }
        catch (Exception objError)
        {
            _objLogger.LogError(
                $"Error en UsuarioRepository.{TransformarUsuarioToUsuarioResponseDto}: {objError.Message} \n"+
                $" Tipo Error: {objError.InnerException} ,\n "+
                $"Linea: {objError.StackTrace} ");
            throw;
        }  
    }   

    public async Task<UsuarioResponseDto> GetUsuario()
    {
        UsuarioResponseDto objUsuarioResponseDto;
        try{
            var objUsuario = await  _objUserManager
                                    .FindByNameAsync(_objUsuarioSesion.ObtenerUsuarioSesion());
            if(objUsuario == null)
            { 
                throw new MiddlewareException(
                        System.Net.HttpStatusCode.Unauthorized, 
                        new {mensaje = "El usuario del token no existe en la base de datos."}
                ); 

            }   
            objUsuarioResponseDto = TransformarUsuarioToUsuarioResponseDto(objUsuario!);
            return objUsuarioResponseDto;
        }
        catch (Exception objError)
        {
            _objLogger.LogError(
                $"Error en UsuarioRepository.{GetUsuario}: {objError.Message} \n"+
                $" Tipo Error: {objError.InnerException} ,\n "+
                $"Linea: {objError.StackTrace} ");
            throw;
        }   
    }

    public async Task<UsuarioResponseDto> Login(UsuarioLoginRequestDto objUsuario)
    {
        UsuarioResponseDto objUsuarioResponseDto;
        try{
            var objUsuarioRepo = await _objUserManager.FindByEmailAsync(objUsuario.strEmail!);
            if(objUsuario == null)
            { 
                throw new MiddlewareException(
                        System.Net.HttpStatusCode.Unauthorized, 
                        new {mensaje = "El email del usuario no existe en la base de datos."}
                ); 

            }
            var objResultado = await _objSignInManager.CheckPasswordSignInAsync(objUsuarioRepo!, objUsuario.strPassword!, false);  
            if(objResultado.Succeeded)
            {
                objUsuarioResponseDto = TransformarUsuarioToUsuarioResponseDto(objUsuarioRepo!);
                return objUsuarioResponseDto;
            }
            else
            {
                throw new MiddlewareException(
                        System.Net.HttpStatusCode.Unauthorized, 
                        new {mensaje = "Las credenciales son incorrectas."}
                ); 
            }
        }
        catch (Exception objError)
        {
            _objLogger.LogError(
                $"Error en UsuarioRepository.{Login}: {objError.Message} \n"+
                $" Tipo Error: {objError.InnerException} ,\n "+
                $"Linea: {objError.StackTrace} ");
            throw;
        }  
    }

    public async Task<UsuarioResponseDto> RegistroUsuario(UsuarioRegistroRequestDto objUsuario)
    {
        UsuarioResponseDto objUsuarioResponseDto;
        try{
            var blExisteEmail = await _objUserManager.Users
            .Where(obj => obj.Email == objUsuario.strEmail!).AnyAsync();

            if(blExisteEmail)
            {
                throw new MiddlewareException(
                        System.Net.HttpStatusCode.BadRequest, 
                        new {mensaje = "El email ya existe en la base de datos."}
                ); 
            }

            
            var blExisteUserName = await _objUserManager.Users
            .Where(obj => obj.UserName == objUsuario.strUserName!).AnyAsync();

            if(blExisteUserName)
            {
                throw new MiddlewareException(
                        System.Net.HttpStatusCode.BadRequest, 
                        new {mensaje = "El username ya existe en la base de datos."}
                ); 
            }
            var objUsuarioCreacion = new Usuario
            {
                strNombre = objUsuario.strNombre,
                strApellido = objUsuario.strApellido,
                Email = objUsuario.strEmail,
                UserName = objUsuario.strUserName,
                strTelefono = objUsuario.strTelefono,
                strUsuarioCreacion =_objUsuarioSesion.ObtenerUsuarioSesion()
            };
            
            var objResultado = await _objUserManager.CreateAsync(objUsuarioCreacion, objUsuario.strPassword!);
            if(objResultado.Succeeded){
                objUsuarioResponseDto = TransformarUsuarioToUsuarioResponseDto(objUsuarioCreacion);
                return objUsuarioResponseDto; 
            }
            else
            {
                throw new Exception( "No se pudo registrar el usuario.");
            }        
        }
        catch (Exception objError)
        {
            _objLogger.LogError(
                $"Error en UsuarioRepository.{RegistroUsuario}: {objError.Message} \n"+
                $" Tipo Error: {objError.InnerException} ,\n "+
                $"Linea: {objError.StackTrace} ");
            throw;
        }  
    }
}