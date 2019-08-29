using ECommerceAPI.Models;
using System.Collections.Generic;
using System.Linq;
using ECommerceAPI.Base.Extensions;
using ECommerceAPI.Builders.Interfaces;
using ECommerceAPI.Services;
using System;

namespace ECommerceAPI.Builders.Implementation
{
    public class ProductsBuilder : IProductsBuilder
    {
        protected List<Product> _products = new List<Product>();
        public ProductsBuilder BuildProductType(List<ProductType> productType)
        {
            productType = productType.IfNull();
            _products.ForEach(p => p.ProductType = productType.Where(pt => pt.ProductTypeId == p.ProductTypeId).FirstOrDefault());
            return this;
        }
        public ProductsBuilder BuildImages(List<Image> Images)
        {
            Images = Images.IfNull();
            Images.ForEach(i => i.Path = (!String.IsNullOrEmpty(i.Path) ? i.Path : FileService.GetFileHostPath(i.Name)));
            _products.ForEach(p => p.Images.AddRange(Images.Where(i => i.ProductId == p.ProductId)));
            return this;
        }
        public ProductsBuilder BuildInformations(List<Information> Informations)
        {
            Informations = Informations.IfNull();
            _products.ForEach(p => p.Informations.AddRange(Informations.Where(i => i.ProductId == p.ProductId)));
            return this;
        }
        public ProductsBuilder BuildBaseInformation(List<Product> products)
        {
            products = products.IfNull();
            products.ForEach(pp =>
            {
                 _products.Add(new Product()
                 {
                     ProductId = pp.ProductId,
                     Name = pp.Name,
                     Code = pp.Code,
                     Active = pp.Active,
                     ProductTypeId = pp.ProductTypeId,
                 });

            });
            return this;
        }
        public IEnumerable<Product> Build()
        {
            var newProducts = _products;
            _products = new List<Product>();
            return newProducts;
        }
    }
}

