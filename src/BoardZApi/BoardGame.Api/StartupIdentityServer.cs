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
using BoardGame.Api.Security.IdentityManager;
using BoardGame.Api.Security.IdentityServer;
using BoardGame.Api.Storages;
using IdentityManager.Configuration;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using Owin;
using Swashbuckle.Application;
using IdentityServer3.Core.Configuration;
using IdentityServer3.Core.Models;
using IdentityServer3.Core.Services;
using IdentityServer3.Core.Services.InMemory;
using IdentityServer3.AccessTokenValidation;
using Microsoft.Owin.Logging;

namespace BoardGame.Api
{
    public class StartupIdentityServer
    {
        public void Configuration(IAppBuilder appBuilder)
        {
            var identityServerOptions = CreateIdentityServerConfiguration();
            appBuilder.Map("/idsrv", coreApp =>
            {
                coreApp.UseIdentityServer(identityServerOptions);
            });
        }

        private IdentityServerOptions CreateIdentityServerConfiguration()
        {
            var factory = new IdentityServerServiceFactory();

            // users
            factory.ConfigureCustomUserService("MembershipReboot");
            /*
            factory.Register(new Registration<List<InMemoryUser>>(Users.Get()));
            factory.UserService = new Registration<IUserService, InMemoryUserService>();
            */
            // clients
            factory.Register(new IdentityServer3.Core.Configuration.Registration<IEnumerable<Client>>(Clients.Get()));
            factory.ClientStore = new IdentityServer3.Core.Configuration.Registration<IClientStore>(typeof(InMemoryClientStore));

            // Cors
            factory.CorsPolicyService = new IdentityServer3.Core.Configuration.Registration<ICorsPolicyService>(new InMemoryCorsPolicyService(Clients.Get()));
 
            // scopes
            factory.Register(new IdentityServer3.Core.Configuration.Registration<IEnumerable<Scope>>(Security.IdentityServer.Scopes.Get()));
            factory.ScopeStore = new IdentityServer3.Core.Configuration.Registration<IScopeStore>(typeof(InMemoryScopeStore));

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
    }
}