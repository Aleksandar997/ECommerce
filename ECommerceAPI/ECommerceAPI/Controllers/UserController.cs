using System.Threading.Tasks;
using ECommerceAPI.Base;
using ECommerceAPI.Base.Localization.Services.Interfaces;
using ECommerceAPI.Repository.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace ECommerceAPI.Controllers
{
    [Route("api/user")]
    public class UserController : ControllerDecorator
    {
        private IUserRepository _userRepository { get; set; }
        public UserController(IUserRepository userRepository, ILocalizationService localization) : base(localization)
        {
            _userRepository = userRepository;
        }
        [HttpGet("getuser")]
        public async Task<IActionResult> Login()
        {
            var res = await  _userRepository.SelectAllUsers();
            return Ok(res);
        }
    }
}
