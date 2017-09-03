using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.IO.Compression;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Threading.Tasks;
using BoardZ.API.Configuration;
using BoardZ.API.Database;
using BoardZ.API.Filters;
using BoardZ.API.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Hosting.Internal;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.AspNetCore.ResponseCompression;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using BoardZ.API.Helpers;

namespace BoardZ.API
{
    public class Startup
    {
        public Startup(IHostingEnvironment hostingEnvironment)
        {
            HostingEnvironment = hostingEnvironment;
            var configBuilder = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json", optional: true)
                .AddJsonFile($"appsettings.{hostingEnvironment.EnvironmentName}.json", optional: true);

            if (hostingEnvironment.IsDevelopment())
            {
                configBuilder.AddUserSecrets<Startup>();
            }
            Configuration = configBuilder.Build();
        }

        public IConfiguration Configuration { get; }
        protected IHostingEnvironment HostingEnvironment { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddOptions();
            services.Configure<BoardZConfiguration>(Configuration.GetSection("BoardZ"));
            var configurationProviders = services.BuildServiceProvider();
            var boardZConfiguration = configurationProviders.GetRequiredService<IOptions<BoardZConfiguration>>().Value;
            services.AddCors();
            services.AddTransient<DistanceCalculator, DistanceCalculator>();
            services.AddTransient<AgeRatingsService, AgeRatingsService>();
            services.AddTransient<CategoriesService, CategoriesService>();
            services.AddTransient<GamesService, GamesService>();
            services.AddTransient<PlayersService, PlayersService>();

            JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear();
            services.AddAuthentication(options => { options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme; })
                .AddJwtBearer(options =>
                {
                    options.Events = new JwtBearerEvents
                    {
                        OnAuthenticationFailed = context =>
                        {
                            context.Response.StatusCode = (int) HttpStatusCode.Unauthorized;
                            context.Fail(context.Exception.Message);
                            return Task.CompletedTask;
                        }
                    };
                    options.RequireHttpsMetadata = boardZConfiguration.IsHttpsRequired;
                    options.Authority = boardZConfiguration.IdSrvUrl;
                    options.Audience = boardZConfiguration.IdSrvAudience;
                });
            services.Configure<GzipCompressionProviderOptions>(options =>
            {
                options.Level = CompressionLevel.Fastest;
            });
            services.AddResponseCompression(options =>
            {
                options.EnableForHttps = true;
                options.Providers.Add<GzipCompressionProvider>();
            });

            services.AddDbContext<BoardZContext>();
            services.AddMvc(options =>
            {
                if (HostingEnvironment.IsProduction())
                {
                    options.Filters.Add(new RequireHttpsAttribute());
                }
                var policies = new AuthorizationPolicyBuilder()
                    .RequireAuthenticatedUser()
                    .RequireClaim(JwtRegisteredClaimNames.Sub)
                    .Build();
                options.Filters.Add(new AuthorizeFilter(policies));
                options.Filters.Add(typeof(ExceptionFilter));
                options.Filters.Add(new ProducesAttribute("application/json"));
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            app.UseResponseCompression();
            app.UseAuthentication();
            app.UseCors(config => config.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin().AllowCredentials());
            app.UseMvc();
        }
    }
}
