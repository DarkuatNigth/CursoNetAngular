using System.Net;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using NetKubernetes.Data.Inmuebles;
using NetKubernetes.Dtos;
using NetKubernetes.Dtos.InmuebleDtos;
using NetKubernetes.Middleware;
using NetKubernetes.Models;

namespace NetKubernetes.Controllers;

    [Route("api/[controller]")]
    [ApiController]
public class InmuebleController : ControllerBase
{
        private readonly IInmuebleRepository _objInmuebleRepository;
        private readonly ILogger<InmuebleController> _objLogger; 
        private IMapper _objMapper;
        public InmuebleController(
            IInmuebleRepository objInmuebleRepository, 
            ILogger<InmuebleController> objLogger,
            IMapper objMapper)  
        {
            _objInmuebleRepository = objInmuebleRepository;
            _objLogger = objLogger;
            _objMapper = objMapper;
        }

    [HttpGet]
    public async Task<ActionResult<Task<IList<InmuebleResponseDto>>>> GetInmuebles()
    {
        try
        {
            var objInmuebles = await  _objInmuebleRepository.GetAllInmuebles();
            return Ok(_objMapper.Map<IList<InmuebleResponseDto>>(objInmuebles));
        }
        catch (Exception objError)
        {
            _objLogger.LogError(
                $"Error en InmuebleController.{GetInmuebles}: {objError.Message} \n"+
                $" Tipo Error: {objError.InnerException} ,\n "+
                $"Linea: {objError.StackTrace} ");
            return StatusCode(500, new {mensaje = "Error en el servidor."});
        }
    } 

    
    [HttpGet("{intId}", Name = "GetInmuebleById")]
    public async Task<ActionResult<Task<InmuebleResponseDto>>> GetInmuebleById(int intId)
    {
        try
        {
            var objInmuebles = await  _objInmuebleRepository.GetInmuebleById(intId);
            if(objInmuebles == null)
            {
                throw new MiddlewareException(HttpStatusCode.NotFound, new {mensaje = $"No se encontro el inmueble por este id {intId}"});
            }
            return Ok(_objMapper.Map<InmuebleResponseDto>(objInmuebles));
        }
        catch (Exception objError)
        {
            _objLogger.LogError(
                $"Error en InmuebleController.{GetInmuebleById}: {objError.Message} \n"+
                $" Tipo Error: {objError.InnerException} ,\n "+
                $"Linea: {objError.StackTrace} ");
            return StatusCode(500, new {mensaje = "Error en el servidor."});
        }
    }   

    [HttpPost]
    public async Task<ActionResult<Task<InmuebleResponseDto>>> CreateInmueble([FromBody]InmuebleRequestDto objInmueble)
    {
        try
        {
            var objInmuebleModel = _objMapper.Map<Inmueble>(objInmueble);
            Console.WriteLine($"CreateInmueble Inmueble: {objInmuebleModel.dbPrecio}");
            await _objInmuebleRepository.CreateInmueble(objInmuebleModel);
            await _objInmuebleRepository.SaveChanges();
            if(objInmuebleModel == null)
            {
                throw new MiddlewareException(HttpStatusCode.BadRequest, new {mensaje = "Error al crear el inmueble"});
            }
            var objInmuebleResponse = _objMapper.Map<InmuebleResponseDto>(objInmuebleModel);
            return CreatedAtRoute(nameof(GetInmuebleById), new {objInmuebleResponse.intId}, objInmuebleResponse);
        }
        catch (Exception objError)
        {
            _objLogger.LogError(
                $"Error en InmuebleController.{CreateInmueble}: {objError.Message} \n"+
                $" Tipo Error: {objError.InnerException} ,\n "+
                $"Linea: {objError.StackTrace} ");
            return StatusCode(500, new {mensaje = "Error en el servidor."});
        }

    }  
    
    [HttpDelete("{intId}")]
    public async Task<ActionResult> DeleteInmueble(int intId)
    {
        try
        {
            await _objInmuebleRepository.DeleteInmueble(intId);
            await _objInmuebleRepository.SaveChanges();
            return Ok(new {mensaje = "Inmueble eliminado correctamente."});
        }
        catch (Exception objError)
        {
            _objLogger.LogError(
                $"Error en InmuebleController.{DeleteInmueble}: {objError.Message} \n"+
                $" Tipo Error: {objError.InnerException} ,\n "+
                $"Linea: {objError.StackTrace} ");
            return StatusCode(500, new {mensaje = "Error en el servidor."});
        }
    }
}
