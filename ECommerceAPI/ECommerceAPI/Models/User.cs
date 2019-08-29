using System.Collections.Generic;

namespace ECommerceAPI.Models
{
    public class User
    {
        public int UserId { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public bool Active { get; set; }
        public List<Menu> Menu { get; set; }
        public List<Role> Role { get; set; }
        public List<Permission> Permission { get; set; }
        public User()
        {
            Menu = new List<Menu>();
            Role = new List<Role>();
            Permission = new List<Permission>();
        }
    }
}
