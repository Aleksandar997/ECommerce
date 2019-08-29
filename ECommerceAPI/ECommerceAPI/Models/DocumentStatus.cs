using System.ComponentModel.DataAnnotations;

namespace ECommerceAPI.Models
{
    public class DocumentStatus
    {
        public int DocumentStatusId { get; set; }
        [Required(ErrorMessage = "code_required")]
        public string Code { get; set; }
        public string Value { get; set; }
        public bool Active { get; set; }
    }
}
