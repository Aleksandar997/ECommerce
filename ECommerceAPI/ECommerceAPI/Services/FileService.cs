using ECommerceAPI.Base;
using ECommerceAPI.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace ECommerceAPI.Services
{
    public class FileService
    {
        private static readonly IHttpContextAccessor HttpContextAccessor = DependencyInjectionResolver.GetService<IHttpContextAccessor>();
        private static readonly IHostingEnvironment env = DependencyInjectionResolver.GetService<IHostingEnvironment>();
        private static readonly List<string> AlowImageExtensions = (".jpg,.jpeg,.png,.bmp").Split(',').ToList();
        private static readonly string Host = HttpContextAccessor.HttpContext.Request.Scheme + "://" + HttpContextAccessor.HttpContext.Request.Host + HttpContextAccessor.HttpContext.Request.PathBase + "/";
        private static readonly string ServerPath = env.ContentRootPath + "/";
        private const string TempFolderPath = UploadFolderName + "temp/";
        private const string UploadFolderName = "upload/";
        public static ResponseBase<List<string>> DeleteFile(List<string> fileNames)
        {
            foreach (var name in fileNames)
            {
                if (File.Exists(GetFileFullPath(name)))
                {
                    try
                    {
                        File.Delete(GetFileFullPath(name));
                    }
                    catch (Exception)
                    {
                        return ResponseBase<List<string>>.ReturnResponse(new List<string>() { name }, ResponseStatus.Error, new ResponseMessage("image_delete_error").SingleToList());
                    }
                }
            }
            return ResponseBase<List<string>>.ReturnResponse(fileNames, ResponseStatus.Success);
        }
        public static ResponseBase<UploadFileInfo> UploadFile(IFormFile file)
        {
            var fileName = Guid.NewGuid() + Path.GetExtension(file.FileName);
            var fullPath = GetFileFullPath(fileName);
            using (var stream = new FileStream(fullPath, FileMode.Create))
            {
                file.CopyTo(stream);
            }
            if (!CheckExtension(fileName))
                return ResponseBase<UploadFileInfo>.ReturnResponse(new UploadFileInfo(fileName, file.FileName), ResponseStatus.Error, new ResponseMessage("file_extension_not_allowed").SingleToList());

            return ResponseBase<UploadFileInfo>.ReturnResponse(new UploadFileInfo(fileName, file.FileName), ResponseStatus.Success);
        }
        private static string GetFileFullPath(string fileName)
        {
            return ServerPath + TempFolderPath + fileName;
        }
        public static string GetFileHostPath(string fileName)
        {
            return Host + TempFolderPath + fileName;
        }
        private static bool CheckExtension(string fileName)
        {
            return AlowImageExtensions.Contains(Path.GetExtension(fileName)) ? true : false;
        }
    }
}
