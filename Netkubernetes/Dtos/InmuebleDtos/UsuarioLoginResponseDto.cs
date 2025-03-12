namespace NetKubernetes.Dtos;

public class InmuebleResponseDto
{
    public int intId { get; set; }
    public string? strNombre { get; set; }
    public string? strDireccion { get; set; }
    public decimal dbPrecio { get; set; }
    public string? strImagen { get; set; }
    public DateTime dtFechaCreacion { get; set; }
}