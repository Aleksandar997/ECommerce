using ECommerceAPI.Base.Attributes;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ECommerceAPI.Models
{
    public class Document
    {
        public int DocumentId { get; set; }
        [ChildValidation(new string[] { "Code;documenttype_required" })]
        public DocumentType DocumentType { get; set; }
        [ChildValidation(new string[] { "Code;documentstatus_required" })]
        public DocumentStatus DocumentStatus { get; set; }
        public string Code { get; set; }
        [Required(ErrorMessage = "date_required")]
        public DateTime Date { get; set; }
        public decimal Sum { get; set; }
        [ChildValidation(new string[] { "CustomerId;customer_required;DocumentType.Code=bill" })]
        public Customer Customer { get; set; }
        public List<DocumentDetail> DocumentDetails { get; set; }
        public int CustomerId { get; set; }
        public int DocumentStatusId { get; set; }
        public int DocumentTypeId { get; set; }

        public Document()
        {
            DocumentDetails = new List<DocumentDetail>();
        }
    }
}
