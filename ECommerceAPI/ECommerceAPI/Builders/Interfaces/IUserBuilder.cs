using ECommerceAPI.Builders.Implementation;
using ECommerceAPI.Models;
using System.Collections.Generic;

namespace ECommerceAPI.Builders.Interfaces
{
    public interface IUserBuilder
    {
        IUserBuilder BuildMenus(List<Menu> menus);
        IUserBuilder BuildRoles(List<Role> roles);
        IUserBuilder BuildPermissions(List<Permission> permissions);
        IUserBuilder BuildInformation(User user);
        User Build();
    }
}
