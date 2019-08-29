using ECommerceAPI.Builders.Implementation;
using ECommerceAPI.Models;
using System.Collections.Generic;

namespace ECommerceAPI.Builders.Interfaces
{
    public interface IUserBuilder
    {
        UserBuilder BuildMenus(List<Menu> menus);
        UserBuilder BuildRoles(List<Role> roles);
        UserBuilder BuildPermissions(List<Permission> permissions);
        UserBuilder BuildInformation(User user);
        User Build();
    }
}
