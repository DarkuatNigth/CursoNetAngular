using System.Net;

namespace  NetKubernetes.Middleware;

public class MiddlewareException : Exception
{
    public HttpStatusCode ObjCodigo { get; set; }

    public object? ObjErrores { get; set; }

    public MiddlewareException(HttpStatusCode Codigo, object? Errores)
    {
        ObjCodigo = Codigo;
        ObjErrores = Errores;
    }
}