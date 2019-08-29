using ECommerceAPI.Base.Localization.Models;
using ECommerceAPI.Base.Localization.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ECommerceAPI.Base.Localization.Controllers
{
    [Route("api/localization")]
    public class LocalizationController : ControllerDecorator
    {
        public LocalizationController(ILocalizationService localization) : base(localization)
        {
        }
        [HttpGet]
        [AllowAnonymous]
        public IActionResult TranslatesSelectAll()
        {
            var res = Localization.GetAllLocalizationByCulture().ToList();
            return Ok(ResponseBase<List<Culture>>.ReturnResponse(res, ResponseStatus.Success));
        }
    }
}

