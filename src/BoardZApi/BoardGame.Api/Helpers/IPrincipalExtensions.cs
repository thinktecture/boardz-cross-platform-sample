using System;
using System.Security.Claims;
using System.Security.Principal;

namespace BoardGame.Api.Helpers
{
    public static class IPrincipalExtensions
    {
        public static string GetCurrentUsernameOrThrow(this IPrincipal principal)
        {
            var user = (ClaimsPrincipal) principal;

            if (user == null)
            {
                throw new Exception("No user found.");
            }

            var claim = user.FindFirst(ClaimTypes.NameIdentifier);

            if (claim == null)
            {
                throw new Exception("Claim not found.");
            }

            return claim.Value;
        }
    }
}