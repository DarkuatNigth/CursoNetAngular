using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NetKubernetes.Models
{
    public class Inmueble
    {
        [Key]
        [Required]
        public int intId { get; set; }

        public string? strNombre { get; set; }
        public string? strDireccion { get; set; }
        public string? strImagen { get; set; }

        [Required]
        [Column(TypeName = "decimal(18, 4)")]
        public decimal? dbPrecio { get; set; }

        [Required]
        public bool blEstado {get; set;}
        public DateTime dtFechaCreacion { get; set; }
        
        public string? strUsuarioCreacion { get; set; }
        public DateTime dtFechaModificacion { get; set; }
        public string? strUsuarioModificacion { get; set; }

        public Guid? UsuarioId {get; set;}
    }
}