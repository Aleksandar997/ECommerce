namespace ECommerceAPI.Models
{
    public class Permission
    {
        public int PermissionId { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public int ParentId { get; set; }
        public bool Active { get; set; }
        public int UserId { get; set; }
    }
}
