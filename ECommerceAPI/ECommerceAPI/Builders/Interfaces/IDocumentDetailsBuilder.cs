using ECommerceAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ECommerceAPI.Builders.Interfaces
{
    public interface IDocumentDetailsBuilder
    {
        IDocumentDetailsBuilder BuildProducts(List<Product> products);
        IDocumentDetailsBuilder BuildVat(List<Vat> vats);
        IDocumentDetailsBuilder BuildBaseInformation(List<DocumentDetail> details);
        IEnumerable<DocumentDetail> Build();
    }
}
