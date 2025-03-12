using System.Security.Claims;

namespace NetKubernetes.Token;

    public class UsuarioSesion : IUsuarioSesion
    {
        public readonly IHttpContextAccessor _objHttpContextAccessor;

        public  UsuarioSesion(IHttpContextAccessor objHttpContextAccessor)
        {
            _objHttpContextAccessor = objHttpContextAccessor;
        }
        public string ObtenerUsuarioSesion()
        {
            var strNombreUsuario = _objHttpContextAccessor.HttpContext!.User?.Claims?
            .FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value;
            return strNombreUsuario!;
        }
    }
