using ECommerceAPI.Configuration.Providers;
using ECommerceAPI.Configuration.Repository.Interfaces;
using Microsoft.Extensions.Configuration;

namespace ECommerceAPI.Configuration.Models
{
    public class ConfigurationSource : IConfigurationSource
    {
        private IConfigurationRepository _configurationRepository;
        private readonly string _config;

        public ConfigurationSource(string config, IConfigurationRepository configurationRepository)
        {
            _config = config;
            _configurationRepository = configurationRepository;
        }

        public IConfigurationProvider Build(IConfigurationBuilder builder)
        {
            return new CustomConfigurationProvider(_config, _configurationRepository);
        }
    }
}
