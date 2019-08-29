using ECommerceAPI.Configuration;
using ECommerceAPI.Security.TokenProvider.Interfaces;
using Microsoft.IdentityModel.Tokens;
using System;

namespace ECommerceAPI.Security.TokenProvider
{
    public class TokenProviderOptions : ITokenProviderOptions
    {
        public string Path { get; set; } = "/api/token";

        public string Issuer { get; set; } = AppSettings.Instance.Security.Issuer;

        public string Audience { get; set; } = AppSettings.Instance.Security.Audience;

        public TimeSpan Expiration { get; set; } = TimeSpan.FromMinutes(240);

        public SigningCredentials SigningCredentials { get; set; }

    }
}
