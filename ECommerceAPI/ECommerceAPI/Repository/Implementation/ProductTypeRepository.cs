using Dapper;
using ECommerceAPI.Base;
using ECommerceAPI.Base.Repository;
using ECommerceAPI.Helpers;
using ECommerceAPI.Models;
using ECommerceAPI.Repository.Interfaces;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace ECommerceAPI.Repository.Implementation
{
    public class ProductTypeRepository : RepositoryBase, IProductTypeRepository
    {
        public ProductTypeRepository(string connectionString) : base(connectionString)
        {
        }

        public async Task<ResponseBase<IEnumerable<ProductType>>> SelectAllProductTypes()
        {
            return await ExecuteQuery(async () =>
            {
                using (var connection = CreateConnection())
                {
                    using (var multi = await connection.DbConnection.QueryMultipleAsync("[dbo].[ProductType_SelectAll]", null, null, null, CommandType.StoredProcedure))
                    {
                        var productTypes = multi.Read<ProductType>().ToList();
                        return new ResponseBase<IEnumerable<ProductType>>()
                        {
                            Data = TreeviewHelper.BuildTreeview(null, productTypes, "ProductTypeId")
                        };
                    }
                }

            });
        }

        public async Task<ResponseBase<int>> SaveChanges(List<ProductType> productTypes, int userId)
        {
            return await ExecuteQuery(async () =>
            {
                using (var connection = CreateConnection())
                {
                    var param = new DynamicParameter(new
                    {
                        ProductTypes = ParameterHelper.ToUserDefinedTableType(productTypes.Select(p => new
                        {
                            p.ProductTypeId,
                            p.Name,
                            p.Active,
                            p.ParentId,
                            p.ToBeDeleted,
                            p.IndGuid,
                            p.ParentGuid
                        }).ToList(), "ProductTypeList"),
                        UserId = userId
                    });

                    var result = await connection.DbConnection.ExecuteScalarAsync<int>("[dbo].[ProductType_SaveChanges]", param, null, null, CommandType.StoredProcedure);

                    return new ResponseBase<int>
                    {
                        Data = result,
                        Status = connection.Messages.Any() ? ResponseStatus.Error : ResponseStatus.Success,
                        Messages = connection.Messages
                    };
                }
            });
        }
    }
}
