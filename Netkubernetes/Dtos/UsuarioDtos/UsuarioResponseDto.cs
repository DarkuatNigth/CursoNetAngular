namespace NetKubernetes.Dtos.UsuarioDtos
{
    public class UsuarioResponseDto
    {
        public string? strId { get; set; }
        public string? strNombre { get; set; }
        public string? strApellido { get; set; }
        public string? strToken { get; set; }
        public string? strUserName { get; set; }
        public string? strEmail { get; set; }
        public string? strTelefono { get; set; }
        
        public UsuarioResponseDto(string strId, string strNombre, string strApellido, string strToken, string strUserName, string strEmail, string strTelefono)
        {
            this.strId = strId;
            this.strNombre = strNombre;
            this.strApellido = strApellido;
            this.strToken = strToken;
            this.strUserName = strUserName;
            this.strEmail = strEmail;
            this.strTelefono = strTelefono;
        }   
    }
}