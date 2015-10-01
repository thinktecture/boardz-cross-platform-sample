using System.Net.Http.Formatting;
using System.Reflection;
using System.Web.Http;
using System.Web.Http.Cors;
using Autofac;
using Autofac.Integration.WebApi;
using BoardGame.Api.Security;
using BoardGame.Api.Storages;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using Owin;

namespace BoardGame.Api
{
    public class Startup
    {
        public void Configuration(IAppBuilder appBuilder)
        {
            var container = CreateAutofacContainer();
            var httpConfiguration = CreateHttpConfiguration(container);

            SecurityStartup.Configuration(appBuilder);
            appBuilder.UseWebApi(httpConfiguration);
        }

        private IContainer CreateAutofacContainer()
        {
            var containerBuilder = new ContainerBuilder();
            containerBuilder.RegisterApiControllers(typeof (Startup).Assembly);

            containerBuilder.RegisterType<BoardGameStorage>()
                .As<IStorage<Models.BoardGame>>()
                .SingleInstance();

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
            
            return httpConfiguration;
        }
    }
}