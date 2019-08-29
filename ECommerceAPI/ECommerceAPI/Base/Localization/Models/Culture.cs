using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ECommerceAPI.Base.Localization.Models
{
    public class Culture
    {
        public int CultureId { get; set; }
        public string Name { get; set; }
        public string Flag { get; set; }
        public string Value { get; set; }
        public bool Active { get; set; }
        public Dictionary<string, string> LocalizationPair { get; set; }

        public Culture()
        {
            LocalizationPair = new Dictionary<string, string>();
        }

        public Culture(string name, string value, string flag)
        {
            this.Name = name;
            this.Value = value;
            this.Flag = flag;
        }

        public Culture Clear()
        {
            return new Culture();
        }
    }
}
