using NetKubernetes.Models;

namespace NetKubernetes.Data.Inmuebles;

public interface IInmuebleRepository 
{
    Task<bool> SaveChanges();

    Task<List<Inmueble>> GetAllInmuebles();

    Task<Inmueble> GetInmuebleById(int intId);

    Task CreateInmueble(Inmueble objInmueble);

    Task DeleteInmueble(int intId); 
    Task UpdateInmueble(Inmueble objInmueble);
}