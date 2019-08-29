using ECommerceAPI.Base;
using ECommerceAPI.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ECommerceAPI.Repository.Interfaces
{
    public interface IUserRepository
    {
        Task<ResponseBase<IEnumerable<User>>> SelectAllUsers();
        Task<ResponseBase<User>> LoginUser(string username, string password, int cultureId);
    }
}
