using ECommerceAPI.Base.Localization.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ECommerceAPI.Base.Localization.Repository.Interfaces
{
    public interface ILocalizationRepository
    {
        Task<ResponseBase<IEnumerable<Culture>>> SelectAllByCulture();
        Task<ResponseBase<int>> SelectInUseCulture();
    }
}
