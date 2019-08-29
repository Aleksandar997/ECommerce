using ECommerceAPI.Base.Localization.Builders.Implementation;
using ECommerceAPI.Base.Localization.Builders.Interfaces;
using ECommerceAPI.Base.Localization.Repository.Implementation;
using ECommerceAPI.Base.Localization.Repository.Interfaces;
using ECommerceAPI.Base.Localization.Services.Implementation;
using ECommerceAPI.Base.Localization.Services.Interfaces;
using ECommerceAPI.Builders.Implementation;
using ECommerceAPI.Builders.Interfaces;
using ECommerceAPI.Configuration;
using ECommerceAPI.Configuration.Repository.Implementation;
using ECommerceAPI.Configuration.Repository.Interfaces;
using ECommerceAPI.Repository.Implementation;
using ECommerceAPI.Repository.Interfaces;
using ECommerceAPI.Security.TokenProvider;
using ECommerceAPI.Security.TokenProvider.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;

namespace ECommerceAPI
{
    public static class DependencyExtension
    {
        private static string ConnectionString => AppSettings.Instance.Database.ConnectionString;

        public static void AddDependencies(this IServiceCollection services)
        {
            services.AddSingleton<IConfigurationRepository, ConfigurationRepository>(c => new ConfigurationRepository(ConnectionString));
            services.AddSingleton<ITokenProviderOptions, TokenProviderOptions>();
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();

            services.AddSingleton<ICultureBuilder, CultureBuilder>();
            services.AddSingleton<ILocalizationRepository, LocalizationRepository>(c => new LocalizationRepository(ConnectionString, services.BuildServiceProvider().GetService<ICultureBuilder>()));
            services.AddSingleton<ILocalizationService, LocalizationService>(c => new LocalizationService(services.BuildServiceProvider().GetService<ILocalizationRepository>()));

            services.AddSingleton<IProductsBuilder, ProductsBuilder>();
            services.AddSingleton<IProductTypeRepository, ProductTypeRepository>(c => new ProductTypeRepository(ConnectionString));
            services.AddSingleton<IProductRepository, ProductRepository>(c => new ProductRepository(ConnectionString, services.BuildServiceProvider().GetService<IProductsBuilder>()));

            services.AddSingleton<IUserBuilder, UserBuilder>();
            services.AddSingleton<IUserRepository, UserRepository>(c => new UserRepository(ConnectionString, services.BuildServiceProvider().GetService<IUserBuilder>()));

            services.AddSingleton<IDocumentStatusRepository, DocumentStatusRepository>(c => new DocumentStatusRepository(ConnectionString));

            services.AddSingleton<IVatRepository, VatRepository>(c => new VatRepository(ConnectionString));

            services.AddSingleton<ICustomerRepository, CustomerRepository>(c => new CustomerRepository(ConnectionString));

            services.AddSingleton<IDocumentRepository, DocumentRepository>(c => new DocumentRepository(ConnectionString));

        }
    }
}
