using ECommerceAPI.Configuration.Repository.Interfaces;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Linq;

namespace ECommerceAPI.Configuration.Providers
{
    public class CustomConfigurationProvider : ConfigurationProvider
    {
        private IConfigurationRepository _configurationRepository;
        private readonly string _config;

        public CustomConfigurationProvider(string config, IConfigurationRepository configurationRepository)
        {
            _config = config;
            _configurationRepository = configurationRepository;
        }

        public override void Load()
        {
            var configData = _configurationRepository.GetConfiguration(_config).Result;
            Data = configData.Data?.ToDictionary(c => c.Name, c => c.Value) ?? new Dictionary<string, string>();
        }
    }
}
