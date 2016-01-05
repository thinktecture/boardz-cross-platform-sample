using BoardGame.Api.Security.IdentityManager;
using IdentityManager.Configuration;
using Owin;

namespace BoardGame.Api
{
    public class IdentityManagerStartup
    {
        public void Configuration(IAppBuilder appBuilder)
        {
            appBuilder.Map("/admin", adminApp =>
            {
                var factory = new IdentityManagerServiceFactory();
                factory.Configure("MembershipReboot");

                adminApp.UseIdentityManager(new IdentityManagerOptions()
                {
                    Factory = factory,

                    SecurityConfiguration = new LocalhostSecurityConfiguration(),
                });
            });
        }
    }
}