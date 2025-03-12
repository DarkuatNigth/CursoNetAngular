
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NetKubernetes.Data.Usuarios;
using NetKubernetes.Dtos.UsuarioDtos;
using NetKubernetes.Middleware;

namespace NetKubernetes.Controllers;    

[Route("api/[controller]")]
[ApiController]
public class UsuarioController : ControllerBase
{
    private readonly IUsuarioRepository _objUsuarioRepository;
    private readonly ILogger<UsuarioController> _objLogger;

    public UsuarioController(IUsuarioRepository objUsuarioRepository, ILogger<UsuarioController> objLogger)
    {
        _objUsuarioRepository = objUsuarioRepository;
        _objLogger = objLogger;
    }      

    [AllowAnonymous]
    [HttpPost("login")]
    public async Task<ActionResult<UsuarioResponseDto>> Login
    ([FromBody] UsuarioLoginRequestDto objUsuario)
    {
        try
        {
            Console.WriteLine($"UsuarioController.Login: {objUsuario}");
            return await _objUsuarioRepository.Login(objUsuario);
        }
        catch (Exception objError)
        {
            _objLogger.LogError(
                $"Error en UsuarioController.{Login}: {objError.Message} \n"+
                $" Tipo Error: {objError.InnerException} ,\n "+
                $"Linea: {objError.StackTrace} ");
            return StatusCode(500, new {mensaje = "Error en el servidor."});
        }
    }  

    
    [AllowAnonymous]
    [HttpPost("registrar")]
    public async Task<ActionResult<UsuarioResponseDto>> Registrar
    ([FromBody] UsuarioRegistroRequestDto objUsuario)
    {
        try
        {
            return await _objUsuarioRepository.RegistroUsuario(objUsuario);
        }
        catch (Exception objError)
        {
            _objLogger.LogError(
                $"Error en UsuarioController.{Login}: {objError.Message} \n"+
                $" Tipo Error: {objError.InnerException} ,\n "+
                $"Linea: {objError.StackTrace} ");
            return StatusCode(500, new {mensaje = "Error en el servidor."});
        }
    }  

 
    [HttpGet]
    public async Task<ActionResult<UsuarioResponseDto>> DevolverUsuario()
    {
        try
        {
            return await _objUsuarioRepository.GetUsuario();
        }
        catch (Exception objError)
        {
            _objLogger.LogError(
                $"Error en UsuarioController.{Login}: {objError.Message} \n"+
                $" Tipo Error: {objError.InnerException} ,\n "+
                $"Linea: {objError.StackTrace} ");
            return StatusCode(500, new {mensaje = "Error en el servidor."});
        }
    } 
}
