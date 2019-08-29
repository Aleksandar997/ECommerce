using ECommerceAPI.Base.Extensions;
using ECommerceAPI.Base.Localization.Services.Interfaces;
using System;
using System.Collections.Generic;

namespace ECommerceAPI.Base
{
    public class ResponseBase<T>
    {
        public List<ResponseMessage> Messages { get; set; }
        public T Data { get; set; }
        public ResponseStatus Status { get; set; }
        public int Count { get; set; }

        public void TranslateMessages()
        {
            Messages = Messages.IfNull();
            Messages.ForEach(message => message.IfNull().TranslateCode());
        }

        public static ResponseBase<T> ReturnResponse(T data, ResponseStatus status, List<ResponseMessage> messages = null)
        {
            return new ResponseBase<T>()
            {
                Messages = messages,
                Data = data,
                Status = status
            };
        }
    }
    public class ResponseMessage
    {
        private ILocalizationService _localizationService = DependencyInjectionResolver.GetService<ILocalizationService>();
        public string Value { get; internal set; }
        public string Code { get; set; }

        public ResponseMessage(string code = null)
        {
            Code = code;
        }
        public void TranslateCode()
        {
            Value = String.IsNullOrEmpty(Code) ? null : _localizationService.GetTranslate(Code);
        }
        public List<ResponseMessage> SingleToList()
        {
            return new List<ResponseMessage>() { this };
        }
    }
    public enum ResponseStatus
    {
        Success, Error
    }
}
