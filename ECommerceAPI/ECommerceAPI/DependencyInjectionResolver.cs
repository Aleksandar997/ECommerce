using System;

namespace ECommerceAPI
{
    public static class DependencyInjectionResolver
    {
        public static void Initialization(IServiceProvider serviceProvider)
        {
            ServiceProvider = serviceProvider;
        }

        public static IServiceProvider ServiceProvider { get; set; }

        public static T GetService<T>()
        {
            return (T)ServiceProvider.GetService(typeof(T));
        }
    }
}
