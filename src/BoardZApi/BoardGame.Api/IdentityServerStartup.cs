using System.Collections.Generic;
using BoardGame.Api.Security.IdentityServer;
using Owin;
using IdentityServer3.Core.Configuration;
using IdentityServer3.Core.Models;
using IdentityServer3.Core.Services;
using IdentityServer3.Core.Services.InMemory;

namespace BoardGame.Api
{
    public class IdentityServerStartup
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

            // clients
            factory.Register(new Registration<IEnumerable<Client>>(Clients.Get()));
            factory.ClientStore = new Registration<IClientStore>(typeof(InMemoryClientStore));

            // Cors
            factory.CorsPolicyService = new Registration<ICorsPolicyService>(new InMemoryCorsPolicyService(Clients.Get()));
 
            // scopes
            factory.Register(new Registration<IEnumerable<Scope>>(Scopes.Get()));
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
    }
}