using System.Collections.Generic;
using IdentityServer3.Core;
using IdentityServer3.Core.Models;

namespace BoardGame.Api.Security.IdentityServer
{
    public class Scopes
    {
        public static IEnumerable<Scope> Get()
        {
            return new[]
                {
                    ////////////////////////
                    // resource scopes
                    ////////////////////////

                    new Scope
                    {
                        Name = "default",
                        DisplayName = "Default",
                        Type = ScopeType.Resource,
                        Emphasize = true,
                        ShowInDiscoveryDocument = false,

                        Claims = new List<ScopeClaim>
                        {
                            new ScopeClaim(Constants.ClaimTypes.Name),
                            new ScopeClaim(Constants.ClaimTypes.Email)
                        }
                    }
                };
        }
    }
}
