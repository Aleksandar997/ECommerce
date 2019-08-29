using ECommerceAPI.Base;
using ECommerceAPI.Base.Localization.Services.Interfaces;
using ECommerceAPI.Models;
using ECommerceAPI.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Internal;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;

namespace ECommerceAPI.Controllers
{
    [Route("api/file")]
    public class FileController : ControllerDecorator
    {
        public FileController(ILocalizationService localization) : base(localization)
        {

        }
        [HttpPost("image")]
        public async Task<IActionResult> Insertimage()
        {
            var uploadFileInfo = new List<UploadFileInfo>();

            foreach (var file in HttpContext.Request.Form.Files)
            {
                using (var ms = new MemoryStream())
                {
                    await file.CopyToAsync(ms);
                    var img = new FormFile(ms, 0, ms.Length, file.Name, file.FileName);

                    var res = FileService.UploadFile(img);
                    uploadFileInfo.Add(res.Data);
                    if (res.Status == ResponseStatus.Error)
                        return Ok(ResponseBase<List<UploadFileInfo>>.ReturnResponse(uploadFileInfo, ResponseStatus.Error, res.Messages));
                }
            }

            return Ok(ResponseBase<List<UploadFileInfo>>.ReturnResponse(uploadFileInfo, ResponseStatus.Success));

        }
    }
}
