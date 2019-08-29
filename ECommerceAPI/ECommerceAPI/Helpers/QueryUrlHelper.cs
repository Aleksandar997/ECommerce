using ECommerceAPI.Base.Extensions;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;

namespace ECommerceAPI.Helpers
{
    public class QueryUrlHelper
    {
        public static T ToObject<T>(IQueryCollection keyValuePairs)
        {
            keyValuePairs = keyValuePairs.IfNull();
            var obj = (T)Activator.CreateInstance(typeof(T));
            foreach (var p in typeof(T).GetProperties())
            {
                obj.GetType().GetProperty(p.Name).SetValue(obj, Convert.ChangeType(keyValuePairs[p.Name].FirstOrDefault(), p.PropertyType));
            }
            return obj;
        }

        public static List<T> ToList<T>(IQueryCollection keyValuePairs)
        {
            keyValuePairs = keyValuePairs.IfNull();
            var objs = (List<T>)Activator.CreateInstance(typeof(List<T>));
            for (int i = 0; i < keyValuePairs.FirstOrDefault().Value.Count; i++)
            {
                var obj = (T)Activator.CreateInstance(typeof(T));
                foreach (var p in typeof(T).GetProperties())
                {
                    var value = keyValuePairs[p.Name].ToList().ElementAtOrDefault(i);
                    obj.GetType().GetProperty(p.Name).SetValue(obj, Convert.ChangeType(value, p.PropertyType));
                }
                objs.Add(obj);
            }

            return objs;
        }

    }
}
