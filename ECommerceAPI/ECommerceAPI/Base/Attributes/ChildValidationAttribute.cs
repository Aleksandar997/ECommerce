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
        public Dictionary<string, string> RequiredProps { get; set; }
        public ChildValidationAttribute(string[] requiredProps = null) 
            : this(requiredProps.ToDictionary(x => x.Split(';')[0], x => x.Contains(';') ? x.Split(';')[1] : null))
        {
            
        }

        public ChildValidationAttribute(Dictionary<string, string> requiredProps)
        {
            RequiredProps = requiredProps ?? new Dictionary<string, string>();
        }
    }
}
