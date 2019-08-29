using ECommerceAPI.Builders.Implementation;
using ECommerceAPI.Models;
using System.Collections.Generic;

namespace ECommerceAPI.Builders.Interfaces
{
    public interface IProductsBuilder
    {
        ProductsBuilder BuildProductType(List<ProductType> productType);
        ProductsBuilder BuildImages(List<Image> Images);
        ProductsBuilder BuildInformations(List<Information> Informations);
        ProductsBuilder BuildBaseInformation(List<Product> products);
        IEnumerable<Product> Build();
    }
}
