using ECommerceAPI.Base.Localization.Builders.Implementation;
using ECommerceAPI.Base.Localization.Models;
using System.Collections.Generic;

namespace ECommerceAPI.Base.Localization.Builders.Interfaces
{
    public interface ICultureBuilder
    {
        CultureBuilder BuildInformation(List<Culture> cultures);
        CultureBuilder BuildLocalization(List<LocalizationEntity> localization);
        IEnumerable<Culture> Build();
    }
}
