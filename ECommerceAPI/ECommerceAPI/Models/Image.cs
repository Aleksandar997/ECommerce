using System.ComponentModel.DataAnnotations;

namespace ECommerceAPI.Models
{
    public class Image
    {
        public int ImageId { get; set; }
        public string Path { get; set; }
        [Required(ErrorMessage = "name_required")]
        public string Name { get; set; }
        public bool Active { get; set; }
        public int ProductId { get; set; }
    }
}
