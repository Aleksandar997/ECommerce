using ECommerceAPI.Models.Interfaces;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ECommerceAPI.Models
{
    public class ProductType : ITreeview<ProductType>, ITreeViewEditable<ProductType>
    {
        [Range(1, int.MaxValue, ErrorMessage = "productType_required")]
        public int ProductTypeId { get; set; }
        public string Name { get; set; }
        public string Active { get; set; }
        public int ParentId { get; set; }
        public List<ProductType> Children { get; set; }
        public bool Touched { get; set; }
        public Guid IndGuid { get; set; }
        public Guid ParentGuid { get; set; }
        public bool ToBeDeleted { get; set; }
        public ProductType()
        {
            Touched = false;
            Children = new List<ProductType>();
        }
    }
}
