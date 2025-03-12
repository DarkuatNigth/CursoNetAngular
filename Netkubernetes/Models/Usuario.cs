using Microsoft.AspNetCore.Identity;

namespace NetKubernetes.Models
{
    public class Usuario : IdentityUser
    {
        public int intId { get; set; }
        public string? strNombre { get; set; }
        public string? strApellido { get; set; }
        public string? strTelefono { get; set; }
        public string? strUsuarioCreacion { get; set; }
        public DateTime dtFechaCreacion { get; set; }
        public string? strUsuarioModificacion { get; set; }
        public DateTime dtFechaModificacion { get; set; }
    }   
}