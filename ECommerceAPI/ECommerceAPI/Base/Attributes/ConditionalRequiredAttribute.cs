using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ECommerceAPI.Base.Attributes
{
    public class ConditionalRequiredAttribute : ValidationAttribute
    {
        private string Prop { get; set; }
        private object PropValue { get; set; }
        public ConditionalRequiredAttribute(string condition, string errorMessage)
        {
            ErrorMessage = errorMessage;
            var condAndProp = condition.Split("=");
            Prop = condAndProp.ElementAtOrDefault(0);
            PropValue = condAndProp.ElementAtOrDefault(1);
        }

        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            var currentValue = validationContext.ObjectInstance.GetType().GetProperty(Prop).GetValue(validationContext.ObjectInstance);
            if (currentValue == PropValue && value == null)
                return new ValidationResult(ErrorMessage);
            return ValidationResult.Success;
        }
    }
}
