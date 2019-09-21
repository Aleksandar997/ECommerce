using ECommerceAPI.Builders.Interfaces;
using ECommerceAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ECommerceAPI.Builders.Implementation
{
    public class CustomersBuilder : ICustomersBuilder
    {
        private readonly IUserBuilder _userBuilder = DependencyInjectionResolver.GetService<IUserBuilder>();
        private List<Customer> _Customers = new List<Customer>();
        public ICustomersBuilder BuildBaseInformation(List<Customer> customers)
        {
            _Customers = customers;
            return this;
        }

        public IEnumerable<Customer> Build()
        {
            var customers = _Customers;
            _Customers = new List<Customer>();
            return customers;
        }

        public ICustomersBuilder BuildUsers(List<User> users)
        {
            _Customers.ForEach(c =>
            {
                c.User = _userBuilder.BuildInformation(users.Find(u => u.UserId == c.UserId)).Build();
            });
            return this;
        }
    }
}
