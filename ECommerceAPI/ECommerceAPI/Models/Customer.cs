using System.ComponentModel.DataAnnotations;

namespace ECommerceAPI.Models
{
    public class Customer
    {
        [Required(ErrorMessage = "customerId_required")]
        public int? CustomerId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Address { get; set; }
        public string Floor { get; set; }
        public string Flat { get; set; }
        public string ContactNumber { get; set; }
        public User User { get; set; }
        public int UserId { get; set; }
    }
}
