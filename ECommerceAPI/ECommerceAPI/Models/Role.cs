namespace ECommerceAPI.Models
{
    public class Role
    {
        public int RoleId { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public bool Active { get; set; }
        public int UserId { get; set; }
    }
}
