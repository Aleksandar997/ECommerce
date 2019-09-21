using Dapper;
using ECommerceAPI.Base;
using ECommerceAPI.Base.Repository;
using ECommerceAPI.Builders.Interfaces;
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
        private ICustomersBuilder customersBuilder;
        public CustomerRepository(string connectionString, ICustomersBuilder _customersBuilder) : base(connectionString)
        {
            customersBuilder = _customersBuilder;
        }

        public async Task<ResponseBase<IEnumerable<Customer>>> SelectAll()
        {
            return await ExecuteQuery(async () =>
            {
                using (var connection = CreateConnection())
                {
                    using (var multi = await connection.DbConnection.QueryMultipleAsync("[dbo].[Customer_SelectAll]", null, null, null, CommandType.StoredProcedure))
                    {
                        var customers = customersBuilder.BuildBaseInformation(multi.Read<Customer>().ToList())
                                                        .BuildUsers(multi.Read<User>().ToList())
                                                        .Build();
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
