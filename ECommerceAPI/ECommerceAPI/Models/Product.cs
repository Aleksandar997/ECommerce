using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ECommerceAPI.Models
{
    public class Product
    {
        public int ProductId { get; set; }
        [Required(ErrorMessage = "name_required")]
        public string Name { get; set; }
        [Required(ErrorMessage = "code_required")]
        public string Code { get; set; }
        public int ProductTypeId { get; set; }
        public bool Active { get; set; }
        public ProductType ProductType { get; set; }
        public List<Image> Images { get; set; }
        public List<Information> Informations { get; set; }
        public Product()
        {
            Images = new List<Image>();
            Informations = new List<Information>();
            ProductType = new ProductType();
        }
    }
}
