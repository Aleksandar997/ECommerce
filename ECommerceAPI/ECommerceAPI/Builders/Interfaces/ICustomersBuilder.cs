using ECommerceAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ECommerceAPI.Builders.Interfaces
{
    public interface ICustomersBuilder
    {
        ICustomersBuilder BuildBaseInformation(List<Customer> customers);
        ICustomersBuilder BuildUsers(List<User> users);
        IEnumerable<Customer> Build();
    }
}
