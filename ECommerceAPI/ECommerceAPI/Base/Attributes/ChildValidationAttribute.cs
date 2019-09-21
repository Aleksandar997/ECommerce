using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ECommerceAPI.Base.Attributes
{
    [AttributeUsage(AttributeTargets.Property)]
    public class ChildValidationAttribute : Attribute
    {
        public Dictionary<string, string[]> RequiredProps { get; set; }
        //public Dictionary<string, string> Condition { get; set; }
        public ChildValidationAttribute(string[] requiredProps = null) 
            : this(MapArray(requiredProps))
        {
            
        }

        public ChildValidationAttribute(Dictionary<string, string[]> requiredProps)
        {
            RequiredProps = requiredProps ?? new Dictionary<string, string[]>();
        }
        public static Dictionary<string, string[]> MapArray(string[] requiredProps)
        {
            return requiredProps.ToDictionary(x => x.Split(';')[0],
                                              x => (x.Contains(';') && x.Count(c => c == ';') == 1) ?
                                                new string[] {x.Split(';')[1]} :
                                              x.Count(c => c == ';') == 2 ?
                                                new string[] { x.Split(';')[1], x.Split(';')[2] } 
                                              : null);  
        }
    }
}
