using ECommerceAPI.Base.Extensions;
using ECommerceAPI.Base.Localization.Builders.Interfaces;
using ECommerceAPI.Base.Localization.Models;
using System.Collections.Generic;
using System.Linq;

namespace ECommerceAPI.Base.Localization.Builders.Implementation
{
    public class CultureBuilder : ICultureBuilder
    {
        public List<Culture> _cultures = new List<Culture>();
        public CultureBuilder BuildInformation(List<Culture> cultures)
        {
            cultures = cultures.IfNull();
            _cultures.AddRange(cultures);
            return this;
        }
        public CultureBuilder BuildLocalization(List<LocalizationEntity> localization)
        {
            localization = localization.IfNull();
            //_cultures.ForEach(c => c.Localization.AddRange(localization.Where(l => l.CultureId == c.CultureId)));
            _cultures.ForEach(c => c.LocalizationPair = localization.Where(l => l.CultureId == c.CultureId).ToDictionary(d => d.Name, d => d.Value));
            return this;
        }
        public IEnumerable<Culture> Build()
        {
            var newCultures = _cultures;
            _cultures = new List<Culture>();
            return newCultures;
        }
    }
}
