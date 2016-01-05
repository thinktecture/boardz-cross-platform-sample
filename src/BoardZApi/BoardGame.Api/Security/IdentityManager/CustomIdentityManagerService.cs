using BoardGame.Api.Security.MembershipReboot;
using IdentityManager.MembershipReboot;

namespace BoardGame.Api.Security.IdentityManager
{
    public class CustomIdentityManagerService : MembershipRebootIdentityManagerService<CustomUser, CustomGroup>
    {
        public CustomIdentityManagerService(CustomUserAccountService userSvc, CustomGroupService groupSvc)
            : base(userSvc, groupSvc)
        {
        }
    }
}
