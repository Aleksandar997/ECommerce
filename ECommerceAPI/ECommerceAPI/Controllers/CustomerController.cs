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
    [Route("api/customer")]
    public class CustomerController : ControllerDecorator
    {
        ICustomerRepository _customerRepository;
        public CustomerController(ILocalizationService localization, ICustomerRepository customerRepository) : base(localization)
        {
            _customerRepository = customerRepository;
        }
        [HttpGet("selectAll")]
        public async Task<IActionResult> SelectAll()
        {
            var res = await _customerRepository.SelectAll();
            return Ok(res);
        }
    }
}
