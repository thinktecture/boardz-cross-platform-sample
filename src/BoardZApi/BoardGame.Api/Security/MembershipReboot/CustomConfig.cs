using BrockAllen.MembershipReboot;

namespace BoardGame.Api.Security.MembershipReboot
{
    public class CustomConfig : MembershipRebootConfiguration<CustomUser>
    {
        public static readonly CustomConfig Config;

        static CustomConfig()
        {
            Config = new CustomConfig()
            {
                PasswordHashingIterationCount = 10000,
                RequireAccountVerification = false,
            };
        }
    }
}
