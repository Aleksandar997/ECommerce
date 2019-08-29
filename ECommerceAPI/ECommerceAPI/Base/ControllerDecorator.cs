using ECommerceAPI.Base.Localization.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System;
using System.Linq;
using System.Security.Claims;

namespace ECommerceAPI.Base
{
    public class ControllerDecorator : Controller
    {
        protected readonly ILocalizationService Localization;
        protected int UserId;

        public ControllerDecorator(ILocalizationService localization)
        {
            Localization = localization;
        }
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            UserId = Convert.ToInt32(User?.Claims.SingleOrDefault(p => p.Type == ClaimTypes.NameIdentifier)?.Value);
            base.OnActionExecuting(context);
        }
        public OkObjectResult TranslatedOk<T>(ResponseBase<T> value)
        {
            value.TranslateMessages();
            return base.Ok(value);
        }
        public override void OnActionExecuted(ActionExecutedContext context)
        {
            base.OnActionExecuted(context);
        }
    }
}
