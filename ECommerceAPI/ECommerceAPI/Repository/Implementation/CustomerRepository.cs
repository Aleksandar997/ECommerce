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
    public class CustomerRepository : RepositoryBase, ICustomerRepository
    {
        public CustomerRepository(string connectionString) : base(connectionString)
        {

        }

        public async Task<ResponseBase<IEnumerable<Customer>>> SelectAll()
        {
            return await ExecuteQuery(async () =>
            {
                using (var connection = CreateConnection())
                {
                    using (var multi = await connection.DbConnection.QueryMultipleAsync("[dbo].[Customer_SelectAll]", null, null, null, CommandType.StoredProcedure))
                    {
                        var customers = multi.Read<Customer>().ToList();
                        return new ResponseBase<IEnumerable<Customer>>()
                        {
                            Data = customers
                        };
                    }
                }

            });
        }
    }
}
