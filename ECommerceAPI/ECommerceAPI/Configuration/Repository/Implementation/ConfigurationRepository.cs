using Dapper;
using ECommerceAPI.Base;
using ECommerceAPI.Base.Repository;
using ECommerceAPI.Configuration.Models;
using ECommerceAPI.Configuration.Repository.Interfaces;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

namespace ECommerceAPI.Configuration.Repository.Implementation
{
    public class ConfigurationRepository : RepositoryBase, IConfigurationRepository
    {
        public ConfigurationRepository(string connectionString) : base(connectionString)
        {

        }

        public async Task<ResponseBase<IEnumerable<ConfigurationModel>>> GetConfiguration(string config = null, bool state = false)
        {
            return await ExecuteQuery(async () =>
            {
                using (var connection = CreateConnection())
                {
                    using (var users = await connection.DbConnection.QueryMultipleAsync("[dbo].[Configuration_SelectAll]", null, null, null, CommandType.StoredProcedure))
                    {
                        var configuration = users.Read<ConfigurationModel>();
                        return new ResponseBase<IEnumerable<ConfigurationModel>>()
                        {
                            Data = configuration
                        };
                    }
                }
            });
        }
    }
}
