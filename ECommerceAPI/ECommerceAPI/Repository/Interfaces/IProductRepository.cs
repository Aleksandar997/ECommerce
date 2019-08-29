using ECommerceAPI.Base;
using ECommerceAPI.Base.Entities;
using ECommerceAPI.Models;
using ECommerceAPI.Models.Paging;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ECommerceAPI.Repository.Interfaces
{
    public interface IProductRepository
    {
        Task<ResponseBase<IEnumerable<Product>>> SelectAllAsync(BasePaging paging);
        Task<ResponseBase<Product>> SelectSingle(int productId);
        Task<ResponseBase<int>> ProductSave(Product product, int userId);
        Task<ResponseBase<List<string>>> ProductDelete(List<Number> ids);
        Task<ResponseBase<IEnumerable<Product>>> SelectAllByFilter(BasePaging paging);
    }
}
