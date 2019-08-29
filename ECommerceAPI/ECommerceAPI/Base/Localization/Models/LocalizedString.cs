using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ECommerceAPI.Base.Localization.Models
{
    public class LocalizedString
    {
        public int CultureId { get; set; }
        public string Name { get; set; }
        public string Value { get; set; }
        public LocalizedString(int cultureId, string name, string value)
        {
            CultureId = cultureId;
            Name = name;
            Value = value;
        }
    }
}
