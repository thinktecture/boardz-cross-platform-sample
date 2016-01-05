using BrockAllen.MembershipReboot.Ef;

namespace BoardGame.Api.Security.MembershipReboot
{
    public class CustomDatabase : MembershipRebootDbContext<CustomUser, CustomGroup>
    {
        public CustomDatabase()
            : this("MembershipReboot")
        {
        }

        public CustomDatabase(string name)
            : base(name)
        {
        }
    }
}
