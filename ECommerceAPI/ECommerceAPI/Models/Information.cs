using System.ComponentModel.DataAnnotations;

namespace ECommerceAPI.Models
{
    public class Information
    {
        public int InformationId { get; set; }
        [Required(ErrorMessage = "information_required")]
        public string Value { get; set; }
        public bool Active { get; set; } = true;
        public int ProductId { get; set; }
        //public List<string> Informations => Value.Split("\n").ToList();
    }
}
