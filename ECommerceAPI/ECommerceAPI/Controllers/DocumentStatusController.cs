using ECommerceAPI.Base;
using ECommerceAPI.Base.Localization.Services.Interfaces;
using ECommerceAPI.Repository.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ECommerceAPI.Controllers
{
    [Route("api/documentstatus")]
    public class DocumentStatusController : ControllerDecorator
    {
        IDocumentStatusRepository _documentStatusRepository;
        public DocumentStatusController(ILocalizationService localization, IDocumentStatusRepository documentStatusRepository) : base(localization)
        {
            _documentStatusRepository = documentStatusRepository;
        }
        [HttpGet("selectAll")]
        public async Task<IActionResult> SelectAll()
        {
            var res = await _documentStatusRepository.SelectAll();
            return Ok(res);
        }
    }

}
