namespace NetKubernetes.Dtos.InmuebleDtos
{
    public class InmuebleRequestDto
    {
        public string? strNombre { get; set; }
        public string? strDireccion { get; set; }
        public decimal dbPrecio { get; set; }
        public string? strImagen { get; set; }
    }
}