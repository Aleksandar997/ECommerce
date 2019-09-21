using ECommerceAPI.Base.Attributes;
using ECommerceAPI.Base.Extensions;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using System;
using System.Collections.Generic;
using System.Linq;

namespace ECommerceAPI.Helpers
{
    public static class ChildValidation<T>
    {
        public static void Skip(T request, ModelStateDictionary ModelState, string listName = null)
        {
            request = request.IfNull();
            var childObjects = request.GetType().GetProperties().Where(prop => prop.IsDefined(typeof(ChildValidationAttribute), false));
            foreach (var child in childObjects)
            {
                var childObject = (ChildValidationAttribute)child.GetCustomAttributes(typeof(ChildValidationAttribute), false).FirstOrDefault();
                
                if (childObject != null && childObject.RequiredProps != null)
                {
                    foreach (var rp in childObject.RequiredProps)
                    {
                        // Deletes original errors from object
                        var invalidErrors = listName == null ? 
                        ModelState.Keys.Where(k => k.ToLower().StartsWith(child.Name.ToLower()) && !k.ToLower().EndsWith(rp.Key.ToLower())) :
                        ModelState.Keys.Where(k => k.ToLower().StartsWith(listName.ToLower()) && k.ToLower().Contains(child.Name.ToLower()) && !k.ToLower().EndsWith(rp.Key.ToLower()));

                        invalidErrors.ToList().ForEach(e => ModelState.Remove(e));

                        //Adds errors from attribute brackets
                        if (!String.IsNullOrEmpty(rp.Value.ElementAt(0)))
                        {
                            var newErrorMsg = listName == null ?
                            ModelState.Keys.Where(k => k.ToLower().StartsWith(child.Name.ToLower()) && k.ToLower().EndsWith(rp.Key.ToLower())).ToList() :
                            ModelState.Keys.Where(k => k.ToLower().StartsWith(listName.ToLower()) && k.ToLower().Contains(child.Name.ToLower()) && k.ToLower().EndsWith(rp.Key.ToLower())).ToList();

                            //split equal sing from rp.value.elementAt(1), if property from left isde is euqal to request.prop add error
                            var isConditionFulfilled = rp.Value.Count() > 1 ? IsConditionFulfilled(rp.Value.ElementAt(1), GetProp(rp.Value.ElementAt(1), request)) : true;
                            if (newErrorMsg == null || !newErrorMsg.Any())
                                continue;
                            if (!isConditionFulfilled)
                            {
                                newErrorMsg.ForEach(key =>
                                {
                                    ModelState.Remove(key);
                                });
                                continue;
                            }
                            newErrorMsg.ForEach(key =>
                            {
                                ModelState[key].Errors.Clear();
                                ModelState.AddModelError(key, rp.Value.ElementAt(0));
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
        private static object GetProp(string props, object request)
        {
            if (props.Contains("."))
            {
                return GetNestedProps(props, request);
            }
            return request.GetType().GetProperty(props.Split("=").ElementAtOrDefault(0)).GetValue(request);
        }
        private static object GetNestedProps(string props, object request, string[] propsArray = null)
        {
            propsArray = propsArray == null ? new string[] { } : propsArray;
            if (props != null && props.Contains("="))
                props = props.Split("=" + props.Split("=").ElementAtOrDefault(1)).ElementAtOrDefault(0);

            if (props != null &&  (props.Contains(".") || propsArray.Length > 0))
            {
                var propsArr = propsArray.Length == 0 ? props.Split(".") : propsArray;
                return GetNestedProps(propsArr.ElementAtOrDefault(1), request.GetType().GetProperty(propsArr.FirstOrDefault()).GetValue(request), propsArr.Skip(1).ToArray());
            }
            else
            {
                return request;
            }
        }
        private static bool IsConditionFulfilled(string prop, object requestValue)
        {
            return requestValue.Equals(prop.Split("=").ElementAtOrDefault(1)) ? true : false;
        }
    }
}
