using ECommerceAPI.Base;
using ECommerceAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ECommerceAPI.Repository.Interfaces
{
    public interface IVatRepository
    {
        Task<ResponseBase<IEnumerable<Vat>>> SelectAll();
    }
}
