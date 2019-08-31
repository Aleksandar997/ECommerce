using ECommerceAPI.Base.Extensions;
using ECommerceAPI.Builders.Interfaces;
using ECommerceAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ECommerceAPI.Builders.Implementation
{
    public class DocumentsBuilder : IDocumentsBuilder
    {
        private List<Document> _documents = new List<Document>();
        public IEnumerable<Document> Build()
        {
            var newDocuments = _documents;
            _documents = new List<Document>();
            return newDocuments;
        }

        public IDocumentsBuilder BuildBaseInformation(List<Document> documents)
        {
            documents = documents.IfNull();
            documents.ForEach(d =>
            {
                _documents.Add(new Document()
                {
                    DocumentId = d.DocumentId,
                    Code = d.Code,
                    Date = d.Date,
                    Sum = d.Sum,
                    DocumentTypeId = d.DocumentTypeId,
                    DocumentStatusId = d.DocumentStatusId,
                    CustomerId = d.CustomerId
                });
            });
            return this;
        }

        public IDocumentsBuilder BuildCustomers(List<Customer> customers)
        {
            _documents.ForEach(d =>
            {
                d.Customer = customers.Where(c => c.CustomerId == d.CustomerId).FirstOrDefault();
            });
            return this;
        }

        public IDocumentsBuilder BuildDetails(List<DocumentDetail> documentDetails)
        {
            _documents.ForEach(d =>
            {
                d.DocumentDetails.AddRange(documentDetails.Where(dd => dd.DocumentId == d.DocumentId));
            });
            return this;
        }

        public IDocumentsBuilder BuildDocumentStatuses(List<DocumentStatus> documentStatus)
        {
            _documents.ForEach(d =>
            {
                d.DocumentStatus = documentStatus.Where(ds => ds.DocumentStatusId == d.DocumentStatusId).FirstOrDefault();
            });
            return this;
        }

        public IDocumentsBuilder BuildDocumentTypes(List<DocumentType> documentTypes)
        {
            _documents.ForEach(d =>
            {
                d.DocumentType = documentTypes.Where(dt => dt.DocumentTypeId == d.DocumentTypeId).FirstOrDefault();
            });
            return this;
        }
    }
}
