using ECommerceAPI.Base;
using ECommerceAPI.Base.Localization.Services.Interfaces;
using ECommerceAPI.Helpers;
using ECommerceAPI.Models;
using ECommerceAPI.Repository.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ECommerceAPI.Controllers
{
    [Route("api/producttype")]
    public class ProductTypeController : ControllerDecorator
    {
        IProductTypeRepository _productTypeRepository { get; set; }
        public ProductTypeController(IProductTypeRepository productTypeRepository, ILocalizationService localization) : base(localization)
        {
            _productTypeRepository = productTypeRepository;
        }
        [HttpGet("selectAll")]
        public async Task<IActionResult> SelectAllProductTypes()
        {
            var res = await _productTypeRepository.SelectAllProductTypes();
            return Ok(res);
        }
        [HttpPost("saveChanges")]
        public async Task<IActionResult> SaveChanges([FromBody] List<ProductType> productTypes)
        {
            var saveRes = await _productTypeRepository.SaveChanges(TreeviewHelper.FindTouchedNodes(productTypes, new List<ProductType>(), Guid.Empty), UserId);
            if (saveRes.Status == ResponseStatus.Error)
                return TranslatedOk(ResponseBase<int>.ReturnResponse(saveRes.Data, saveRes.Status, saveRes.Messages));
            var res = await _productTypeRepository.SelectAllProductTypes();
            return TranslatedOk(res);
        }
    }
}
