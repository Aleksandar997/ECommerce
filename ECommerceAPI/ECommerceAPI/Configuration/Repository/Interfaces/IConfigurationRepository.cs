using ECommerceAPI.Base;
using ECommerceAPI.Configuration.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ECommerceAPI.Configuration.Repository.Interfaces
{
    public interface IConfigurationRepository
    {
        Task<ResponseBase<IEnumerable<ConfigurationModel>>> GetConfiguration(string config = null, bool state = false);
    }
}
