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
    [Route("api/vat")]
    public class VatController : ControllerDecorator
    {
        IVatRepository _vatRepository;

        public VatController(ILocalizationService localization, IVatRepository vatRepository) : base(localization)
        {
            _vatRepository = vatRepository;
        }
        [HttpGet("selectAll")]
        public async Task<IActionResult> SelectAll()
        {
            var res = await _vatRepository.SelectAll();
            return Ok(res);
        }
    }
}

