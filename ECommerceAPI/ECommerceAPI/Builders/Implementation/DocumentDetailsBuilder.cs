using ECommerceAPI.Base.Extensions;
using ECommerceAPI.Builders.Interfaces;
using ECommerceAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ECommerceAPI.Builders.Implementation
{
    public class DocumentDetailsBuilder : IDocumentDetailsBuilder
    {
        private List<DocumentDetail> _detail = new List<DocumentDetail>();
        public IEnumerable<DocumentDetail> Build()
        {
            var newDetails = _detail;
            _detail = new List<DocumentDetail>();
            return newDetails;
        }

        public IDocumentDetailsBuilder BuildBaseInformation(List<DocumentDetail> details)
        {
            details = details.IfNull();
            details.ForEach(dd =>
            {
                _detail.Add(new DocumentDetail()
                {
                    DocumentDetailId = dd.DocumentDetailId,
                    DocumentType = dd.DocumentType,
                    DocumentId = dd.DocumentId,
                    Quantity = dd.Quantity,
                    Price = dd.Price,
                    Discount = dd.Discount,
                    PriceWithDiscount = dd.PriceWithDiscount,
                    Sum = dd.Sum,
                    ProductId = dd.ProductId,
                    VatId = dd.VatId
                });
            });
            return this;
        }

        public IDocumentDetailsBuilder BuildProducts(List<Product> products)
        {
            products = products.IfNull();
            _detail.ForEach(dd => dd.Product = products.Where(p => p.ProductId == dd.ProductId).FirstOrDefault());
            return this;
        }

        public IDocumentDetailsBuilder BuildVat(List<Vat> vats)
        {
            vats = vats.IfNull();
            _detail.ForEach(dd => dd.Vat = vats.Where(v => v.VatId == dd.VatId).FirstOrDefault());
            return this;
        }
    }
}
