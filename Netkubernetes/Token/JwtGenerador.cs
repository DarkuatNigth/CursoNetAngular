using System.Text;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using NetKubernetes.Models;
using Microsoft.IdentityModel.Tokens;

namespace NetKubernetes.Token;

    public class JwtGenerador : IJwtGenerador
    {
        private readonly ILogger<JwtGenerador> _objLogger;
        public JwtGenerador(ILogger<JwtGenerador> objLogger)
        {
            _objLogger = objLogger;
        }
        public string CrearToken(Usuario objUsuario)
        {
            try{

                var lstClaim = new List<Claim>
                {
                    new Claim(JwtRegisteredClaimNames.NameId, objUsuario.UserName!),
                    new Claim("UserId", objUsuario.Id),
                    new Claim("email",objUsuario.Email!) 
                }; 


                var objLlave = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("EstaEsUnaClaveMuyLargaParaElTokenQueTiene64CaracteresExactamente"));

                var objCredenciales = new SigningCredentials(objLlave,SecurityAlgorithms.HmacSha512Signature);
                var objTokenDescripcion = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(lstClaim),
                    Expires = DateTime.Now.AddDays(30),
                    SigningCredentials = objCredenciales
                };

                var objTokenHandler = new JwtSecurityTokenHandler();
                var objToken = objTokenHandler.CreateToken(objTokenDescripcion);
                return objTokenHandler.WriteToken(objToken);

            }catch(Exception objError)
            {
                _objLogger.LogError(
                    $"Error en JwtGenerador.{CrearToken}: {objError.Message} \n"+
                    $" Tipo Error: {objError.InnerException} ,\n "+
                    $"Linea: {objError.StackTrace} ");
                throw;
            }
        }
    }
