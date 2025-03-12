using Microsoft.AspNetCore.Identity;
using NetKubernetes.Models;

namespace NetKubernetes.Data;

public class LoadDatabase{
    public static async Task InsertarData(AppDbContext objContext, UserManager<Usuario> objUserManager)
    {
        if (!objContext.Usuarios.Any())
        {
            var objUsuario = new Usuario
            {
                strNombre = "Admin",
                strApellido = "Admin",
                strTelefono = "1234567890",
                UserName = "efmartillos",
                Email = "fernonmartillo@gmail.com"
            };
            await objUserManager.CreateAsync(objUsuario, "Admin.Emma1234$");
        }
        if(!objContext.Inmuebles.Any())
        {
            objContext.Inmuebles.AddRange(
                new Inmueble
                {
                    strNombre = "Casa en la playa",
                    strDireccion = "Calle 1, Playa 1",
                    dbPrecio = 100000,
                    dtFechaCreacion = DateTime.Now,
                    strUsuarioCreacion = "Admin",
                    blEstado = true
                },
                new Inmueble
                {
                    strNombre = "Casa en la montaña",
                    strDireccion = "Calle 2, Montaña 1",
                    dbPrecio = 200000,
                    dtFechaCreacion = DateTime.Now,
                    strUsuarioCreacion = "Admin",
                    blEstado = true
                },
                new Inmueble
                {
                    strNombre = "Casa en la ciudad",
                    strDireccion = "Calle 3, Ciudad 1",
                    dbPrecio = 300000,
                    dtFechaCreacion = DateTime.Now,
                    strUsuarioCreacion = "Admin",
                    blEstado = true
                }
            );
             objContext.SaveChanges();
        }
    }
}