namespace ECommerceAPI.Configuration.Models
{
    public class ConfigurationModel
    {
        public int? ConfigurationId { get; set; }
        public string Description { get; set; }
        public string Name { get; set; }
        public string Value { get; set; }
        public int? ParentId { get; set; }
    }
}
