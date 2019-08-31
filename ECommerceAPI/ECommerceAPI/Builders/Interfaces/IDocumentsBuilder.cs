using ECommerceAPI.Models;
using System.Collections.Generic;
using Document = ECommerceAPI.Models.Document;

namespace ECommerceAPI.Builders.Interfaces
{
    public interface IDocumentsBuilder
    {
        IDocumentsBuilder BuildBaseInformation(List<Document> documents);
        IDocumentsBuilder BuildDocumentTypes(List<DocumentType> documentTypes);
        IDocumentsBuilder BuildDocumentStatuses(List<DocumentStatus> documentStatus);
        IDocumentsBuilder BuildCustomers(List<Customer> customers);
        IDocumentsBuilder BuildDetails(List<DocumentDetail> documentDetails);
        IEnumerable<Document> Build();
    }
}
