using ECommerceAPI.Base.Extensions;
using ECommerceAPI.Base.Localization.Models;
using ECommerceAPI.Base.Localization.Repository.Interfaces;
using ECommerceAPI.Base.Localization.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ECommerceAPI.Base.Localization.Services.Implementation
{
    public class LocalizationService : ILocalizationService
    {
        private ILocalizationRepository _repository;
        private static List<Culture> _localization;
        private static int cultureId;
        private int CultureId
        {
            get => cultureId == 0 ? SelectInUseCulture() : cultureId;
            set => cultureId = value;
        }

        public LocalizationService(ILocalizationRepository repository)
        {
            _repository = repository;
            _localization = LocalizationSelectAll();
        }

        private List<Culture> LocalizationSelectAll()
        {
            return _repository.SelectAllByCulture().Result.Data.ToList();
        }

        private int SelectInUseCulture()
        {
            return _repository.SelectInUseCulture().Result.Data;
        }

        public string GetTranslate(string resource)
        {
            var culture = _localization.Where(c => c.CultureId == CultureId).FirstOrDefault();
            if (culture == null || resource == null)
                return resource;

            if (resource.Contains(";"))
            {
                var resourceAndObject = resource.Split(";");
                
                var translate = culture.LocalizationPair.ContainsKey(resourceAndObject.ElementAtOrDefault(0)) 
                    ? culture.LocalizationPair[resourceAndObject.ElementAtOrDefault(0)] : resource;
                return String.Format(translate, resourceAndObject.ElementAtOrDefault(1));
            }
            return culture.LocalizationPair[resource] ?? resource;
        }

        public void SetCulture(int cultureId)
        {
            CultureId = cultureId;
        }
        public void RefreshData()
        {
            _localization.Clear();
            _localization = LocalizationSelectAll();
        }

        public IEnumerable<Culture> GetAllLocalizationByCulture()
        {
            return _localization;
        }
    }
}
