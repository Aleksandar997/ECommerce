using ECommerceAPI.Base;
using ECommerceAPI.Base.Localization.Services.Interfaces;
using ECommerceAPI.Helpers;
using ECommerceAPI.Models;
using ECommerceAPI.Models.Paging;
using ECommerceAPI.Repository.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ECommerceAPI.Controllers
{
    [Route("api/document")]
    public class DocumentController : ControllerDecorator
    {
        IDocumentRepository _documentRepository;
        public DocumentController(ILocalizationService localization, IDocumentRepository documentRepository) : base(localization)
        {
            _documentRepository = documentRepository;
        }

        [HttpPost("postobject")]
        public async Task<IActionResult> SaveObject([FromBody] Document document)
        {
            ChildValidation<Document>.Skip(document, ModelState);
            ChildValidation<DocumentDetail>.Skip(document.DocumentDetails, ModelState, nameof(document.DocumentDetails));
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var res = await _documentRepository.SaveObject(document, UserId);
            return Ok(res);
        }
        [HttpGet("selectall")]
        public async Task<IActionResult> SelectAll()
        {
            var res = await _documentRepository.SelectAllAsync(new BasePaging());
            return Ok(res);
        }
    }
}

