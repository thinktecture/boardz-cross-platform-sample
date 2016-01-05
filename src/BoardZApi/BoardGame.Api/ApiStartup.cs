using System;
using System.IO;
using System.Net.Http.Formatting;
using System.Reflection;
using System.Web.Http;
using System.Web.Http.Cors;
using Autofac;
using Autofac.Integration.WebApi;
using BoardGame.Api.Helpers;
using BoardGame.Api.Security.IdentityServer;
using BoardGame.Api.Storages;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using Owin;
using Swashbuckle.Application;
using IdentityServer3.AccessTokenValidation;

namespace BoardGame.Api
{
    public class ApiStartup
    {
        public void Configuration(IAppBuilder appBuilder)
        {
            var container = CreateAutofacContainer();
            var httpConfiguration = CreateHttpConfiguration(container);

            appBuilder.UseIdentityServerBearerTokenAuthentication(new IdentityServerBearerTokenAuthenticationOptions
            {
                ValidationMode = ValidationMode.Local,
                IssuerName = "https://boardz.idsrv/",
                SigningCertificate = Certificate.Load(),

                RequiredScopes = new[] { "default" },
            });

            appBuilder.UseWebApi(httpConfiguration);
        }

        private IContainer CreateAutofacContainer()
        {
            var containerBuilder = new ContainerBuilder();
            containerBuilder.RegisterApiControllers(typeof (ApiStartup).Assembly);

            containerBuilder.RegisterType<BoardGameStorage>()
                .As<IStorage<Models.BoardGame>>()
                .SingleInstance();

            containerBuilder.RegisterType<PlayerStorage>()
                .As<IStorage<Models.Player>>()
                .SingleInstance();

            containerBuilder.RegisterType<DistanceCalculator>();

            var container = containerBuilder.Build();

            return container;
        }

        private HttpConfiguration CreateHttpConfiguration(ILifetimeScope lifetimeScope)
        {
            var httpConfiguration = new HttpConfiguration();
            httpConfiguration.MapHttpAttributeRoutes();
            httpConfiguration.Routes.MapHttpRoute("default", "api/{controller}/{action}");

            httpConfiguration.Formatters.Clear();
            httpConfiguration.Formatters.Add(new JsonMediaTypeFormatter()
            {
                SerializerSettings = new JsonSerializerSettings()
                {
                    ContractResolver = new CamelCasePropertyNamesContractResolver()
                }
            });

            httpConfiguration.EnableCors(new EnableCorsAttribute("*", "*", "*"));

            httpConfiguration.DependencyResolver = new AutofacWebApiDependencyResolver(lifetimeScope);

            EnableSwashbuckle(httpConfiguration);

            return httpConfiguration;
        }

        private void EnableSwashbuckle(HttpConfiguration httpConfiguration)
        {
            httpConfiguration.EnableSwagger(c =>
            {
                var baseDirectory = AppDomain.CurrentDomain.BaseDirectory;
                var commentsFileName = Assembly.GetExecutingAssembly().GetName().Name + ".XML";
                var commentsFile = Path.Combine(baseDirectory, "bin", "App_Data", commentsFileName);

                c.IncludeXmlComments(commentsFile);
                c.SingleApiVersion("v1", "BoardGame API");
            })
                .EnableSwaggerUi();
        }
    }
}