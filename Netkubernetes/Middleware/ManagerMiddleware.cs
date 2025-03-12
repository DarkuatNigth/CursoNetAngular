using System.Net;
using System.Text.Json;

namespace NetKubernetes.Middleware
{
    public class ManagerMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ManagerMiddleware> _objLogger;

        public ManagerMiddleware(RequestDelegate next, ILogger<ManagerMiddleware> logger)
        {
            _next = next;
            _objLogger = logger;
        }

        public async Task Invoke(HttpContext context)
        {
                
            try{
                await _next(context);
            }
            catch (Exception objError)
            {
                await ManagerExceptionAsync(context,objError,_objLogger);
                throw;
            }  
        }

        public async Task ManagerExceptionAsync(HttpContext objContext, Exception objError,ILogger<ManagerMiddleware> objLogger)
        {
            object? objErrores = null;

            switch(objError){
                case MiddlewareException me:
                    _objLogger.LogError(
                        $"Error en Middleware : {objError.Message} \n"+
                        $"Tipo Error: {objError.InnerException} ,\n "+
                        $"Linea: {objError.StackTrace} ");
                    objErrores = me.ObjErrores;
                    objContext.Response.StatusCode = (int)me.ObjCodigo;
                    break;
                case Exception e:
                    _objLogger.LogError(
                        $"Error en Middleware : {objError.Message} \n"+
                        $"Tipo Error: {objError.InnerException} ,\n "+
                        $"Linea: {objError.StackTrace} ");
                    objErrores = string.IsNullOrWhiteSpace(objError.Message) ? "Error" : objError.Message;
                    objContext.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                    break;
            }
            objContext.Response.ContentType = "application/json";
                var objResult = string.Empty;
            if(objErrores != null){
                objResult = JsonSerializer.Serialize(new {errores = objErrores});
            }
            await objContext.Response.WriteAsync(objResult);
        }
    }
}