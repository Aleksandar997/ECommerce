using ECommerceAPI.Base;
using ECommerceAPI.Models;
using ECommerceAPI.Models.Paging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ECommerceAPI.Repository.Interfaces
{
    public interface IDocumentRepository
    {
       Task<ResponseBase<int>> SaveObject(Document document, int userId);
       Task<ResponseBase<IEnumerable<Document>>> SelectAllAsync(BasePaging paging);
    }
}
