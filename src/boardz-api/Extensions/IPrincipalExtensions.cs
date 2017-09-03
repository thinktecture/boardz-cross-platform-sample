using System;
using System.Security.Claims;
using System.Security.Principal;

namespace BoardZ.API.Extensions
{
    public static class IPrincipalExtensions
    {
        public static string GetSubjectOrThrow(this IPrincipal principal)
        {
            var user = (ClaimsPrincipal) principal;

            if (user == null)
            {
                throw new Exception("No user found.");
            }

            var claim = user.FindFirst("sub");

            if (claim == null)
            {
                throw new Exception("Claim not found.");
            }

            return claim.Value;
        }
    }
}
