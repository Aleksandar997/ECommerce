using Dapper;
using ECommerceAPI.Base;
using ECommerceAPI.Base.Repository;
using ECommerceAPI.Models;
using ECommerceAPI.Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace ECommerceAPI.Repository.Implementation
{
    public class DocumentStatusRepository : RepositoryBase, IDocumentStatusRepository
    {
        public DocumentStatusRepository(string connectionString) : base(connectionString)
        {
        }

        public async Task<ResponseBase<IEnumerable<DocumentStatus>>> SelectAll()
        {
            return await ExecuteQuery(async () =>
            {
                using (var connection = CreateConnection())
                {
                    using (var multi = await connection.DbConnection.QueryMultipleAsync("[dbo].[DocumentStatus_SelectAll]", null, null, null, CommandType.StoredProcedure))
                    {
                        var documentStatuses = multi.Read<DocumentStatus>().ToList();
                        return new ResponseBase<IEnumerable<DocumentStatus>>()
                        {
                            Data = documentStatuses
                        };
                    }
                }

            });
        }

    }
}
