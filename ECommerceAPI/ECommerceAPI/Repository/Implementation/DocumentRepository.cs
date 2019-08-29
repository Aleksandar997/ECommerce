using Dapper;
using ECommerceAPI.Base;
using ECommerceAPI.Base.Repository;
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
        public DocumentRepository(string connectionString) : base(connectionString)
        {

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
                            Vat = dd.Vat.Code,
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

        public async Task<ResponseBase<IEnumerable<Document>>> SelectAllAsync(BasePaging paging)
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
                    using (var multi = await connection.DbConnection.QueryMultipleAsync("[dbo].[Document_SelectAll]", null, null, null, CommandType.StoredProcedure))
                    {
                        var products = multi.Read<Document>().ToList();
                        //var count = multi.ReadSingleOrDefault<int>();

                        return new ResponseBase<IEnumerable<Document>>()
                        {
                            Data = products,
                        };
                    }
                }

            });
        }
    }
}
