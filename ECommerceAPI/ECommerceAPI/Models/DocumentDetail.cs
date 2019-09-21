using ECommerceAPI.Base.Attributes;
using System.ComponentModel.DataAnnotations;

namespace ECommerceAPI.Models
{
    public class DocumentDetail
    {
        public string DocumentType { get; set; }
        public int? DocumentDetailId { get; set; }
        public int? DocumentId { get; set; }
        public int? ProductId { get; set; }
        [ConditionalRequired("DocumentType=bill", "quantity_required")]
        public int? Quantity { get; set; }
        //[ChildValidation(new string[] { "Code;vat_required" })]
        [ChildValidation(new string[] { "Code;vat_required;DocumentType=bill" })]
        public Vat Vat { get; set; }
        [Required(ErrorMessage = "price_required")]
        public decimal? Price { get; set; }
        [Required(ErrorMessage = "discount_required")]
        public decimal? Discount { get; set; }
        public decimal? PriceWithDiscount { get; set; }
        [ChildValidation(new string[] { "Code;product_required" })]
        public Product Product { get; set; }
        public decimal? Sum { get; set; }
        public int VatId { get; set; }
    }
}
