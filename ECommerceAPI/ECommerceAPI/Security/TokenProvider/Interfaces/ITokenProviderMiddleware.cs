using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;

namespace ECommerceAPI.Security.TokenProvider.Interfaces
{
    public interface ITokenProviderMiddleware
    {
        Task Invoke(HttpContext context);
    }
}
