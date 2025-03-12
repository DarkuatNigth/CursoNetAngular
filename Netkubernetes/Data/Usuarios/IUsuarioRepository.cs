using NetKubernetes.Dtos.UsuarioDtos;
using NetKubernetes.Models;

namespace NetKubernetes.Data.Usuarios;

public interface IUsuarioRepository {
    Task<UsuarioResponseDto> GetUsuario();

    Task<UsuarioResponseDto> Login(UsuarioLoginRequestDto objUsuario);
    Task<UsuarioResponseDto> RegistroUsuario(UsuarioRegistroRequestDto objUsuario);

    
}