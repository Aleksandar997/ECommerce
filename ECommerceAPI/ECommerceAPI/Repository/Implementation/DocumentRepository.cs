using Dapper;
using ECommerceAPI.Base;
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
    public class DocumentRepository : RepositoryBase, IDocumentRepository
    {
        private IDocumentsBuilder documentBuilder;
        private IDocumentDetailsBuilder documentDetailsBuilder;
        private IProductsBuilder productsBuilder;
        public DocumentRepository(string connectionString, IDocumentsBuilder _documentBuilder, IDocumentDetailsBuilder _documentDetailsBuilder, IProductsBuilder _productsBuilder) : base(connectionString)
        {
            documentBuilder = _documentBuilder;
            documentDetailsBuilder = _documentDetailsBuilder;
            productsBuilder = _productsBuilder;
        }

        public async Task<ResponseBase<int>> SaveObject(Document document, int userId)
        {
            return await ExecuteQuery(async () =>
            {
                using (var connection = CreateConnection())
                {
                    var param = new DynamicParameter(new
                    {
                        document.Code,
                        DocumentType = document.DocumentType.Code,
                        DocumentStatus = document.DocumentStatus.Code,
                        document.Date,
                        document.Sum,
                        document.Customer.CustomerId,
                        Details = ParameterHelper.ToUserDefinedTableType(document.DocumentDetails.Select(dd => new
                        {
                            dd.DocumentDetailId,
                            ProductCode = dd.Product.Code,
                            dd.Quantity,
                            Vat = dd.Vat != null ? dd.Vat.Code : null,
                            dd.Price,
                            dd.Discount,
                            dd.PriceWithDiscount,
                            dd.Sum
                        }).ToList(), "DocumentDetailList"),
                        UserId = userId
                    }); ;

                    var result = await connection.DbConnection.ExecuteScalarAsync<int>("[dbo].[Document_Save]", param, null, null, CommandType.StoredProcedure);

                    return new ResponseBase<int>
                    {
                        Data = result,
                        Status = connection.Messages.Any() ? ResponseStatus.Error : ResponseStatus.Success
                    };
                }
            });
        }

        public async Task<ResponseBase<IEnumerable<Document>>> SelectAllAsync(DocumentPaging paging)
        {
            return await ExecuteQuery(async () =>
            {
                using (var connection = CreateConnection())
                {
                    var param = new DynamicParameter(new
                    {
                        paging.DocumentType,
                        paging.SortBy,
                        paging.SortOrder,
                        paging.Skip,
                        paging.Take,
                        paging.Filter
                    });
                    using (var multi = await connection.DbConnection.QueryMultipleAsync("[dbo].[Document_SelectAll]", param, null, null, CommandType.StoredProcedure))
                    {
                        var documents = documentBuilder.BuildBaseInformation(multi.Read<Document>().ToList())
                                                       .BuildDocumentTypes(multi.Read<DocumentType>().ToList())
                                                       .BuildDocumentStatuses(multi.Read<DocumentStatus>().ToList())
                                                       .BuildCustomers(multi.Read<Customer>().ToList())
                                                       .Build();
                        var count = multi.ReadSingleOrDefault<int>();

                        return new ResponseBase<IEnumerable<Document>>()
                        {
                            Data = documents,
                            Count = count
                        };
                    }
                }

            });
        }

        public async Task<ResponseBase<Document>> SelectByDocumentId(DetailPaging paging)
        {
            return await ExecuteQuery(async () =>
            {
                using (var connection = CreateConnection())
                {
                    var param = new DynamicParameter(new
                    {
                        paging.DocumentId,
                        paging.SortBy,
                        paging.SortOrder,
                        paging.Skip,
                        paging.Take,
                        paging.Filter
                    });
                    using (var multi = await connection.DbConnection.QueryMultipleAsync("[dbo].[Document_SelectById]", param, null, null, CommandType.StoredProcedure))
                    {
                        var products = productsBuilder.BuildBaseInformation(multi.Read<Product>().ToList())
                                 .BuildProductType(multi.Read<ProductType>().ToList())
                                 .Build();
                        var details = documentDetailsBuilder.BuildBaseInformation(multi.Read<DocumentDetail>().ToList())
                                                            .BuildProducts(products.ToList())
                                                            .BuildVat(multi.Read<Vat>().ToList())
                                                            .Build();
                        var documents = documentBuilder.BuildBaseInformation(multi.Read<Document>().ToList())
                                                       .BuildDetails(details.ToList())
                                                       .BuildDocumentTypes(multi.Read<DocumentType>().ToList())
                                                       .BuildDocumentStatuses(multi.Read<DocumentStatus>().ToList())
                                                       .BuildCustomers(multi.Read<Customer>().ToList())
                                                       .Build().FirstOrDefault();
                        var count = multi.ReadSingleOrDefault<int>();

                        return new ResponseBase<Document>()
                        {
                            Data = documents,
                            Count = count
                        };
                    }
                }

            });
        }

        public async Task<ResponseBase<IEnumerable<DocumentDetail>>> SelectDocumentDetails(DetailPaging paging)
        {
            return await ExecuteQuery(async () =>
            {
                using (var connection = CreateConnection())
                {
                    var param = new DynamicParameter(new
                    {
                        paging.DocumentId,
                        paging.SortBy,
                        paging.SortOrder,
                        paging.Skip,
                        paging.Take,
                        paging.Filter
                    });
                    using (var multi = await connection.DbConnection.QueryMultipleAsync("[dbo].[Document_SelectDetails]", param, null, null, CommandType.StoredProcedure))
                    {
                        var details = documentDetailsBuilder.BuildBaseInformation(multi.Read<DocumentDetail>().ToList())
                                                            .BuildProducts(multi.Read<Product>().ToList())
                                                            .BuildVat(multi.Read<Vat>().ToList())
                                                            .Build();
                        var count = multi.ReadSingleOrDefault<int>();

                        return new ResponseBase<IEnumerable<DocumentDetail>>()
                        {
                            Data = details,
                            Count = count
                        };
                    }
                }

            });
        }
    }
}
