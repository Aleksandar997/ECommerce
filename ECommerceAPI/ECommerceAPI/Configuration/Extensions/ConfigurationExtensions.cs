using ECommerceAPI.Configuration.Models;
using ECommerceAPI.Configuration.Repository.Interfaces;
using Microsoft.Extensions.Configuration;

namespace ECommerceAPI.Configuration.Extensions
{
    public static class ConfigurationExtensions
    {
        public static IConfigurationBuilder AddDatabaseConfig(this IConfigurationBuilder builder, string config, IConfigurationRepository configurationRepository)
        {
            return builder.Add(new ConfigurationSource(config, configurationRepository));
        }
        public static void LoadDatabaseConfiguration(this IConfiguration configuration, IConfigurationRepository configurationRepository)
        {
            var configBuilder = new ConfigurationBuilder()
                .AddDatabaseConfig(configuration.GetValue<string>("Config"), configurationRepository);
            configBuilder.Build().Bind(AppSettings.Instance);
        }
    }
}
