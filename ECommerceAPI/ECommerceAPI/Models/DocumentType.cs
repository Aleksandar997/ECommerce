using System.ComponentModel.DataAnnotations;

namespace ECommerceAPI.Models
{
    public class DocumentType
    {
        public int DocumentTypeId { get; set; }
        [Required(ErrorMessage = "code_required")]
        public string Code { get; set; }
        public string Value { get; set; }
        public bool Active { get; set; }
    }
}
