using ECommerceAPI.Configuration;
using ECommerceAPI.Configuration.Extensions;
using ECommerceAPI.Configuration.Repository.Interfaces;
using ECommerceAPI.Security;
using ECommerceAPI.Security.TokenProvider;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using System.IO;

namespace ECommerceAPI
{
    public class Startup
    {
        public Startup(IHostingEnvironment _env, IConfiguration configuration)
        {
            env = _env;
            Configuration = configuration;
        }
        public IHostingEnvironment env;
        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
            Configuration.Bind(AppSettings.Instance);
            DependencyExtension.AddDependencies(services);
            if (!string.IsNullOrEmpty(AppSettings.Instance.Config))
                Configuration.LoadDatabaseConfiguration(services.BuildServiceProvider().GetService<IConfigurationRepository>());

            services.AddAuthentication(auth =>
            {
                auth.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                auth.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = JwtTokenValidationParameters.Create();
            });
            DependencyInjectionResolver.Initialization(services.BuildServiceProvider());
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            app.UseCors(builder => builder
            .AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials());
            app.UseStaticFiles(new StaticFileOptions()
            {
                FileProvider = new PhysicalFileProvider(Path.Combine(env.ContentRootPath, @"upload")),
                RequestPath = new PathString("/upload")
            });
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }
            app.UseJWTTokenProviderMiddleware();

            app.UseHttpsRedirection();
            app.UseMvc();
        }
    }
}
