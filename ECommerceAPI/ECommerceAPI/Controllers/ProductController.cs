using ECommerceAPI.Base;
using ECommerceAPI.Base.Entities;
using ECommerceAPI.Base.Extensions;
using ECommerceAPI.Base.Localization.Services.Interfaces;
using ECommerceAPI.Helpers;
using ECommerceAPI.Models;
using ECommerceAPI.Models.Paging;
using ECommerceAPI.Repository.Interfaces;
using ECommerceAPI.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ECommerceAPI.Controllers
{
    [Route("api/product")]
    public class ProductController : ControllerDecorator
    {
        IProductRepository _productRepository { get; set; }
        public ProductController(IProductRepository productRepository, ILocalizationService localization) : base(localization)
        {
            _productRepository = productRepository;
        }
        [HttpPost("insertProduct")]
        public async Task<IActionResult> ProductSave([FromBody] Product product)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var res = await _productRepository.ProductSave(product, UserId);
            return Ok(res);
        }

        [HttpGet("selectAll")]
        public async Task<IActionResult> ProductSelectAll()
        {
            var paging = QueryUrlHelper.ToObject<BasePaging>(HttpContext.Request.Query);

            var res = await _productRepository.SelectAllAsync(paging);
            return Ok(res);
        }

        [HttpDelete("delete")]
        public async Task<IActionResult> ProductDelete()
        {
            var productIds = QueryUrlHelper.ToList<Number>(HttpContext.Request.Query);
            var paging = QueryUrlHelper.ToObject<BasePaging>(HttpContext.Request.Query);
            var deleteRes = await _productRepository.ProductDelete(productIds);
            var res = FileService.DeleteFile(deleteRes.Data);
            if (res.Status == ResponseStatus.Error)
                return Ok(ResponseBase<List<string>>.ReturnResponse(res.Data, res.Status, res.Messages));
            var selectRes = await _productRepository.SelectAllAsync(paging);
            return Ok(selectRes);
        }
        [HttpGet("selectSingle/{productId}")]
        public async Task<IActionResult> ProductSelectSingle(int productId)
        {
            var res = await _productRepository.SelectSingle(productId);
            return Ok(res);
        }
        [HttpGet("selectAllByFilter")]
        public async Task<IActionResult> SelectAllByFilter()
        {
            var paging = QueryUrlHelper.ToObject<BasePaging>(HttpContext.Request.Query);
            var res = await _productRepository.SelectAllByFilter(paging);
            return Ok(res);
        }
    }
}