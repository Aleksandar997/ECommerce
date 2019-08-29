using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ECommerceAPI.Base.Localization.Models
{
    public class LocalizationEntity
    {
        public int ResourceId { get; set; }
        public string Name { get; set; }
        public int TranslateId { get; set; }
        public string Value { get; set; }
        public int CultureId { get; set; }
    }
}
