using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using NetKubernetes.Middleware;
using NetKubernetes.Models;
using NetKubernetes.Token;

namespace   NetKubernetes.Data.Inmuebles;

public class InmuebleRepository : IInmuebleRepository
{
    private readonly AppDbContext _objContext;
    private readonly IUsuarioSesion _objUsuarioSesion;
    private readonly UserManager<Usuario> _objUserManager;
    private readonly ILogger<InmuebleRepository> _objLogger;
    public InmuebleRepository
    (
        AppDbContext objContext, 
        IUsuarioSesion objUsuarioSesion,
        UserManager<Usuario> objUserManager,
        ILogger<InmuebleRepository> objLogger
        )
    {
        _objContext = objContext;
        _objUsuarioSesion = objUsuarioSesion;
        _objUserManager = objUserManager;
        _objLogger = objLogger;
    }
    public async Task  CreateInmueble(Inmueble objInmueble)
    {
        try
        {
        var objUsuario = await _objUserManager.FindByNameAsync(_objUsuarioSesion.ObtenerUsuarioSesion());
        if(objUsuario == null)
        {
            throw new MiddlewareException
            (
                System.Net.HttpStatusCode.Unauthorized, 
                new {mensaje = "El usuario no es valido para ahcer esta insercion."}
            ); 
        }
        if(objInmueble == null)
        {
            throw new MiddlewareException
            (
                System.Net.HttpStatusCode.BadRequest, 
                new {mensaje = "Los datos del inmueble son incorrectos."}
            );
        } 
        objInmueble.blEstado = true;
        objInmueble.strUsuarioCreacion = _objUsuarioSesion.ObtenerUsuarioSesion();
        objInmueble.UsuarioId =  Guid.Parse(objUsuario!.Id) ;
        objInmueble.dtFechaCreacion = DateTime.Now;
        Console.WriteLine($"objInmueble: {objInmueble.dbPrecio}");
        await _objContext.Inmuebles!.AddAsync(objInmueble);
        Console.WriteLine($"objInmueble: {objInmueble.intId}");
        }
        catch (Exception objError)
        {
            _objLogger.LogError(
                $"Error en InmuebleRepository.{CreateInmueble}: {objError.Message} \n"+
                $" Tipo Error: {objError.InnerException} ,\n "+
                $"Linea: {objError.StackTrace} ");
            throw;
        }    
    }

    public async Task DeleteInmueble(int intId)
    {
        try
        {
            var objInmueble = await _objContext.Inmuebles
                            .FirstOrDefaultAsync(
                                obj => obj.intId == intId);
            if(objInmueble == null) new Exception("El inmueble no existe");
            objInmueble!.blEstado = false;
            await _objContext.SaveChangesAsync();
        }
        catch (Exception objError)
        {
            _objLogger.LogError(
                $"Error en InmuebleRepository.{DeleteInmueble}: {objError.Message} \n"+
                $" Tipo Error: {objError.InnerException} ,\n "+
                $"Linea: {objError.StackTrace} ");
            throw;
        }   
    }

    public async Task<List<Inmueble>> GetAllInmuebles()
    {
        try
        {
            return await _objContext.Inmuebles.Where(obj => obj.blEstado == true).ToListAsync();
        }
        catch (Exception objError)
        {
            _objLogger.LogError(
                $"Error en InmuebleRepository.{GetAllInmuebles}: {objError.Message} \n"+
                $" Tipo Error: {objError.InnerException} ,\n "+
                $"Linea: {objError.StackTrace} ");
            throw;
        }      
    }

    public async Task<Inmueble> GetInmuebleById(int intId)
    {
        try{
            
            var objInmueble = await _objContext.Inmuebles
                            .FirstOrDefaultAsync(
                                obj => obj.intId == intId);
            return objInmueble!;
        }
        catch (Exception objError)
        {
            _objLogger.LogError(
                $"Error en InmuebleRepository.{CreateInmueble}: {objError.Message} \n"+
                $" Tipo Error: {objError.InnerException} ,\n "+
                $"Linea: {objError.StackTrace} ");
            throw;
        }   
    }

    public async Task<bool> SaveChanges()
    {
        try{
            return await _objContext.SaveChangesAsync() >= 0;
        }
        catch (Exception objError)
        {
            _objLogger.LogError(
                $"Error en InmuebleRepository.{CreateInmueble}: {objError.Message} \n"+
                $" Tipo Error: {objError.InnerException} ,\n "+
                $"Linea: {objError.StackTrace} ");
            throw;
        } 
    }

    public async Task UpdateInmueble(Inmueble objInmueble)
    {
        try{
            var objInmuebleActua = await _objContext.Inmuebles
                            .FirstOrDefaultAsync(
                                obj => obj.intId == objInmueble.intId);
            if(objInmueble == null) new Exception("El inmueble no existe");
            objInmuebleActua  = objInmueble;
            objInmuebleActua!.strUsuarioModificacion = _objUsuarioSesion.ObtenerUsuarioSesion();
            await _objContext.SaveChangesAsync();
        }
        catch (Exception objError)
        {
            _objLogger.LogError(
                $"Error en InmuebleRepository.{CreateInmueble}: {objError.Message} \n"+
                $" Tipo Error: {objError.InnerException} ,\n "+
                $"Linea: {objError.StackTrace} ");
            throw;
        } 
    }
}