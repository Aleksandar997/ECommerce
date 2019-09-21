using ECommerceAPI.Builders.Implementation;
using ECommerceAPI.Models;
using System.Collections.Generic;

namespace ECommerceAPI.Builders.Interfaces
{
    public interface IProductsBuilder
    {
        IProductsBuilder BuildProductType(List<ProductType> productType);
        IProductsBuilder BuildImages(List<Image> Images);
        IProductsBuilder BuildInformations(List<Information> Informations);
        IProductsBuilder BuildBaseInformation(List<Product> products);
        IEnumerable<Product> Build();
    }
}
