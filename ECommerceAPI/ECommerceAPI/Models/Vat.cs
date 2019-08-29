using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ECommerceAPI.Models
{
    public class Vat
    {
        public int VatId { get; set; }
        [Required(ErrorMessage = "code_required")]
        public string Code { get; set; }
        public string Value { get; set; }
        public bool Active { get; set; }
    }
}
