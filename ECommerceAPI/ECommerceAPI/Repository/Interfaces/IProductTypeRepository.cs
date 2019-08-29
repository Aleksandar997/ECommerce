using ECommerceAPI.Base;
using ECommerceAPI.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ECommerceAPI.Repository.Interfaces
{
    public interface IProductTypeRepository
    {
        Task<ResponseBase<IEnumerable<ProductType>>> SelectAllProductTypes();
        Task<ResponseBase<int>> SaveChanges(List<ProductType> productTypes, int userId);
    }
}
