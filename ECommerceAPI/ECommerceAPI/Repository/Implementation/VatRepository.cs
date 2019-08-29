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
    public class VatRepository : RepositoryBase, IVatRepository
    {
        public VatRepository(string connectionString) : base(connectionString)
        {

        }

        public async Task<ResponseBase<IEnumerable<Vat>>> SelectAll()
        {
            return await ExecuteQuery(async () =>
            {
                using (var connection = CreateConnection())
                {
                    using (var multi = await connection.DbConnection.QueryMultipleAsync("[dbo].[Vat_SelectAll]", null, null, null, CommandType.StoredProcedure))
                    {
                        var vats = multi.Read<Vat>().ToList();
                        return new ResponseBase<IEnumerable<Vat>>()
                        {
                            Data = vats
                        };
                    }
                }

            });
        }
    }
}
