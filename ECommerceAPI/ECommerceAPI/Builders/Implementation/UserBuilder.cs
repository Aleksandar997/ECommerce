using ECommerceAPI.Base.Extensions;
using ECommerceAPI.Builders.Interfaces;
using ECommerceAPI.Helpers;
using ECommerceAPI.Models;
using System.Collections.Generic;

namespace ECommerceAPI.Builders.Implementation
{
    public class UserBuilder : IUserBuilder
    {
        protected User _user = new User();
        public IUserBuilder BuildMenus(List<Menu> menus)
        {
            menus = menus.IfNull();
            _user.Menu = TreeviewHelper.BuildTreeview(null, menus, "MenuId");
            return this;
        }

        public IUserBuilder BuildPermissions(List<Permission> permissions)
        {
            permissions = permissions.IfNull();
            _user.Permission.AddRange(permissions);
            return this;
        }

        public IUserBuilder BuildRoles(List<Role> roles)
        {
            roles = roles.IfNull();
            _user.Role.AddRange(roles);
            return this;
        }
        public IUserBuilder BuildInformation(User user)
        {
            user = user.IfNull();
            _user.UserId = user.UserId;
            _user.Active = user.Active;
            _user.UserName = user.UserName;
            _user.Email = user.Email;
            return this;
        }
        public User Build()
        {
            var newUser = _user;
            _user = new User();
            return newUser;
        }
    }
}
