using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
namespace ECommerceAPI.Security.TokenProvider.Interfaces
{
    public interface ITokenProviderOptions
    {
        string Path { get; set; }
        string Issuer { get; set; }

        string Audience { get; set; }

        TimeSpan Expiration { get; set; }

        SigningCredentials SigningCredentials { get; set; }
    }
}
