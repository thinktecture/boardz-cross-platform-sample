using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.Owin.Security.OAuth;

namespace BoardGame.Api.Security
{
    public class AuthorizationServerProvider : OAuthAuthorizationServerProvider
    {
        public override Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
        {
            context.Validated();
            return base.ValidateClientAuthentication(context);
        }

        public override Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
        {
            // This is highly secure... :-)
            if (context.UserName == context.Password)
            {
                var claimsIdentity = new ClaimsIdentity(context.Options.AuthenticationType);
                claimsIdentity.AddClaim(new Claim(ClaimTypes.NameIdentifier, context.UserName));
                context.Validated(claimsIdentity);
            }

            return base.GrantResourceOwnerCredentials(context);
        }
    }
}