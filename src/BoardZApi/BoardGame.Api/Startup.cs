using System;
using System.Collections.Generic;
using System.IO;
using System.Net.Http.Formatting;
using System.Reflection;
using System.Web.Http;
using System.Web.Http.Cors;
using Autofac;
using Autofac.Integration.WebApi;
using BoardGame.Api.Helpers;
using BoardGame.Api.Security;
using BoardGame.Api.Security.IdentityServer;
using BoardGame.Api.Storages;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using Owin;
using Swashbuckle.Application;
using IdentityServer3.Core.Configuration;
using IdentityServer3.Core.Models;
using IdentityServer3.Core.Services;
using IdentityServer3.Core.Services.InMemory;
using IdentityServer3.AccessTokenValidation;
using IdentityServer3.Core.Services.Default;
using Microsoft.Owin.Cors;

namespace BoardGame.Api
{
    public class Startup
    {
        public void Configuration(IAppBuilder appBuilder)
        {
            var identityServerOptions = CreateIdentityServerConfiguration();
            appBuilder.Map("/idsrv", coreApp =>
            {
                coreApp.UseIdentityServer(identityServerOptions);
            });

            var container = CreateAutofacContainer();
            var httpConfiguration = CreateHttpConfiguration(container);

            appBuilder.UseIdentityServerBearerTokenAuthentication(new IdentityServerBearerTokenAuthenticationOptions
            {
                ValidationMode = ValidationMode.Local,
                IssuerName = "https://boardz.idsrv/",
                SigningCertificate = Certificate.Load(),

                RequiredScopes = new[] { "default" },

                // client credentials for the introspection endpoint
                ClientId = "boardzng",
                ClientSecret = "secret"
            });

            appBuilder.UseWebApi(httpConfiguration);
        }

        private IdentityServerOptions CreateIdentityServerConfiguration()
        {
            var factory = new IdentityServerServiceFactory();

            // users
            factory.Register(new Registration<List<InMemoryUser>>(Users.Get()));
            factory.UserService = new Registration<IUserService, InMemoryUserService>();

            // clients
            factory.Register(new Registration<IEnumerable<Client>>(Clients.Get()));
            factory.ClientStore = new Registration<IClientStore>(typeof(InMemoryClientStore));

            // Cors
            factory.CorsPolicyService = new Registration<ICorsPolicyService>(new InMemoryCorsPolicyService(Clients.Get()));
 
            // scopes
            factory.Register(new Registration<IEnumerable<Scope>>(Security.IdentityServer.Scopes.Get()));
            factory.ScopeStore = new Registration<IScopeStore>(typeof(InMemoryScopeStore));

            var result = new IdentityServerOptions()
            {
                IssuerUri = "https://boardz.idsrv/",
                Factory = factory,
                SigningCertificate = Certificate.Load(),

                // TODO: Set to true (or remove) for production
                RequireSsl = false,
            };

            return result;
        }

        private IContainer CreateAutofacContainer()
        {
            var containerBuilder = new ContainerBuilder();
            containerBuilder.RegisterApiControllers(typeof (Startup).Assembly);

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