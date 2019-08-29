using Dapper;
using ECommerceAPI.Base;
using ECommerceAPI.Base.Entities;
using ECommerceAPI.Base.Repository;
using ECommerceAPI.Builders.Interfaces;
using ECommerceAPI.Models;
using ECommerceAPI.Models.Paging;
using ECommerceAPI.Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace ECommerceAPI.Repository.Implementation
{
    public class ProductRepository : RepositoryBase, IProductRepository
    {
        private IProductsBuilder _productsBuilder;
        public ProductRepository(string connectionString, IProductsBuilder productsBuilder) : base(connectionString)
        {
            _productsBuilder = productsBuilder;
        }

        public async Task<ResponseBase<IEnumerable<Product>>> SelectAllAsync(BasePaging paging)
        {
            return await ExecuteQuery(async () =>
            {
                using (var connection = CreateConnection())
                {
                    var param = new DynamicParameter(new
                    {
                        paging.SortBy,
                        paging.SortOrder,
                        paging.Skip,
                        paging.Take,
                        paging.Filter
                    });
                    using (var multi = await connection.DbConnection.QueryMultipleAsync("[dbo].[Product_SelectAll]", param, null, null, CommandType.StoredProcedure))
                    {
                        var products = _productsBuilder.BuildBaseInformation(multi.Read<Product>().ToList())
                                      .BuildProductType(multi.Read<ProductType>().ToList())
                                      .BuildImages(multi.Read<Image>().ToList())
                                      .BuildInformations(multi.Read<Information>().ToList())
                                      .Build();
                        var count = multi.ReadSingleOrDefault<int>();

                        return new ResponseBase<IEnumerable<Product>>()
                        {
                            Data = products,
                            Count = count
                        };
                    }
                }

            });
        }
        public async Task<ResponseBase<Product>> SelectSingle(int productId)
        {
            return await ExecuteQuery(async () =>
            {
                using (var connection = CreateConnection())
                {
                    var param = new DynamicParameter(new
                    {
                        productId
                    });
                    using (var multi = await connection.DbConnection.QueryMultipleAsync("[dbo].[Product_SelectSingle]", param, null, null, CommandType.StoredProcedure))
                    {
                        var products = _productsBuilder.BuildBaseInformation(multi.Read<Product>().ToList())
                                      .BuildProductType(multi.Read<ProductType>().ToList())
                                      .BuildImages(multi.Read<Image>().ToList())
                                      .BuildInformations(multi.Read<Information>().ToList())
                                      .Build();

                        return new ResponseBase<Product>()
                        {
                            Data = products.FirstOrDefault(),
                    
                        };
                    }
                }

            });
        }

        public async Task<ResponseBase<int>> ProductSave(Product product, int userId)
        {
            return await ExecuteQuery(async () =>
            {
                using (var connection = CreateConnection())
                {
                    var param = new DynamicParameter(new
                    {
                        product.ProductId,
                        product.Name,
                        product.Code,
                        product.ProductType.ProductTypeId,
                        product.Active,
                        Images = ParameterHelper.ToUserDefinedTableType(product.Images.Select(I => new
                        {
                            I.ImageId,
                            I.Path,
                            I.Name,
                            I.Active
                        }).ToList(), "ImageList"),
                        Informations = ParameterHelper.ToUserDefinedTableType(product.Informations.Select(I => new
                        {
                            I.InformationId,
                            I.Value,
                            I.Active
                        }).ToList(), "InformationList"),
                        UserId = userId
                    });

                    var result = await connection.DbConnection.ExecuteScalarAsync<int>("[dbo].[Product_Save]", param, null, null, CommandType.StoredProcedure);

                    return new ResponseBase<int>
                    {
                        Data = result,
                        Status = connection.Messages.Any() ? ResponseStatus.Error : ResponseStatus.Success
                    };
                }
            });
        }
        public async Task<ResponseBase<List<string>>> ProductDelete(List<Number> ids)
        {
            return await ExecuteQuery(async () =>
            {
                using (var connection = CreateConnection())
                {
                    var param = new DynamicParameter(new
                    {
                        IdList = ParameterHelper.ToUserDefinedTableType(ids.Select(x => new { x.Value }).ToList(), "IntList")
                    });


                    using (var result = await connection.DbConnection.QueryMultipleAsync("[dbo].[Product_Delete]", param, null, null, CommandType.StoredProcedure))
                    {
                        var res = result.Read<string>().ToList();
                        return new ResponseBase<List<string>>
                        {
                            Data = res,
                            Status = ResponseStatus.Success
                        };
                    }
                }
            });
        }
        public async Task<ResponseBase<IEnumerable<Product>>> SelectAllByFilter(BasePaging paging)
        {
            return await ExecuteQuery(async () =>
            {
                using (var connection = CreateConnection())
                {
                    var param = new DynamicParameter(new
                    {
                        Filter = paging.Filter
                    });
                    using (var multi = await connection.DbConnection.QueryMultipleAsync("[dbo].[Product_SelectAllByFilter]", param, null, null, CommandType.StoredProcedure))
                    {
                        var products = multi.Read<Product>().ToList();

                        return new ResponseBase<IEnumerable<Product>>()
                        {
                            Data = products,
                        };
                    }
                }

            });
        }
    }
}
