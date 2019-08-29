using ECommerceAPI.Base.Localization.Models;
using System.Collections.Generic;

namespace ECommerceAPI.Base.Localization.Services.Interfaces
{
    public interface ILocalizationService
    {
        void RefreshData();
        IEnumerable<Culture> GetAllLocalizationByCulture();
        string GetTranslate(string resource);
        void SetCulture(int cultureId);
    }
}
