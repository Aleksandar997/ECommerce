using ECommerceAPI.Base.Attributes;
using ECommerceAPI.Base.Extensions;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ECommerceAPI.Helpers
{
    public static class ChildValidation<T>
    {
        public static void Skip(T request, ModelStateDictionary ModelState, string listName = null)
        {
            request = request.IfNull();
            var childProps = request.GetType().GetProperties().Where(prop => prop.IsDefined(typeof(ChildValidationAttribute), false));
            foreach (var child in childProps)
            {
                var childProp = (ChildValidationAttribute)child.GetCustomAttributes(typeof(ChildValidationAttribute), false).FirstOrDefault();
                if (childProp != null && childProp.RequiredProps != null)
                {
                    foreach (var rp in childProp.RequiredProps)
                    {
                        var invalidErrors = listName == null ? ModelState.Keys.Where(k => k.StartsWith(child.Name) && !k.EndsWith(rp.Key))
                                     : ModelState.Keys.Where(k => k.StartsWith(listName) && k.Contains(child.Name) && !k.EndsWith(rp.Key));
                        invalidErrors.ToList().ForEach(e => ModelState.Remove(e));
                        if (!String.IsNullOrEmpty(rp.Value))
                        {
                            var newErrorMsgs = listName == null ? ModelState.Keys.Where(k => k.StartsWith(child.Name) && k.EndsWith(rp.Key))
                                     : ModelState.Keys.Where(k => k.StartsWith(listName) && k.Contains(child.Name) && k.EndsWith(rp.Key));
                            //newErrorMsgs.ToList().ForEach(msg => ModelState.SetModelValue(msg, new ValueProviderResult(new string[] { rp.Value})));
                            newErrorMsgs.ToList().ForEach(key => {
                                ModelState[key].Errors.Clear();
                                ModelState.AddModelError(key, rp.Value);
                            });
                        }
                    }
                }
            }

        }
        public static void Skip(List<T> request, ModelStateDictionary ModelState, string listName = null)
        {
            Skip(request.FirstOrDefault(), ModelState, listName ?? typeof(T).Name);
        }
    }
}
