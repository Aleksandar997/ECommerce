using System;

namespace ECommerceAPI.Base.Extensions
{
    public static class NullObject
    {
        public static T IfNull<T>(this T obj) 
        {
            if (obj == null) return (T)Activator.CreateInstance(typeof(T));
            return obj;
        }
    }
}
 