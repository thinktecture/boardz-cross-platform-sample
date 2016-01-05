using BoardGame.Api.Security.MembershipReboot;
using IdentityManager;
using IdentityManager.Configuration;

namespace BoardGame.Api.Security.IdentityManager
{
    public static class CustomIdentityManagerServiceExtensions
    {
        public static void Configure(this IdentityManagerServiceFactory factory, string connectionString)
        {
            factory.IdentityManagerService = new Registration<IIdentityManagerService, CustomIdentityManagerService>();
            factory.Register(new Registration<CustomUserAccountService>());
            factory.Register(new Registration<CustomGroupService>());
            factory.Register(new Registration<CustomUserRepository>());
            factory.Register(new Registration<CustomGroupRepository>());
            factory.Register(new Registration<CustomDatabase>(resolver => new CustomDatabase(connectionString)));
            factory.Register(new Registration<CustomConfig>(CustomConfig.Config));
        }
    }
}
