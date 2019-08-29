using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using ECommerceAPI.Base.Localization.Builders.Interfaces;
using ECommerceAPI.Base.Localization.Models;
using ECommerceAPI.Base.Localization.Repository.Interfaces;
using ECommerceAPI.Base.Repository;

namespace ECommerceAPI.Base.Localization.Repository.Implementation
{
    public class LocalizationRepository : RepositoryBase, ILocalizationRepository
    {
        private ICultureBuilder _cultureBuilder;
        public LocalizationRepository(string connectionString, ICultureBuilder cultureBuilder) : base(connectionString)
        {
            _cultureBuilder = cultureBuilder;
        }

        public async Task<ResponseBase<IEnumerable<Culture>>> SelectAllByCulture()
        {
            return await ExecuteQuery(async () =>
            {
                using (var connection = CreateConnection())
                {
                    using (var multi = await connection.DbConnection.QueryMultipleAsync("[dbo].[Localization_SelectAll]", null, null, null, CommandType.StoredProcedure))
                    {
                        var localization = _cultureBuilder.BuildInformation(multi.Read<Culture>().ToList())
                                                         .BuildLocalization(multi.Read<LocalizationEntity>().ToList())
                                                         .Build();

                        return new ResponseBase<IEnumerable<Culture>>()
                        {
                            Data = localization,
                            Status = connection.Messages.Any() ? ResponseStatus.Error : ResponseStatus.Success
                        };
                    }
                }

            });
        }

        public async Task<ResponseBase<int>> SelectInUseCulture()
        {
            return await ExecuteQuery(async () =>
            {
                using (var connection = CreateConnection())
                {
                    var cultureId = await connection.DbConnection.QueryFirstOrDefaultAsync<int>("[dbo].[Culture_SelectInUse]", null, null, null, CommandType.StoredProcedure);

                    return new ResponseBase<int>()
                    {
                        Data = cultureId,
                        Status = connection.Messages.Any() ? ResponseStatus.Error : ResponseStatus.Success
                    };
                }

            });
        }
    }
}
