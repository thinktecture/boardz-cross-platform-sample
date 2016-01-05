using System.Collections.Generic;
using IdentityServer3.Core.Models;

namespace BoardGame.Api.Security.IdentityServer
{
    public class Clients
    {
        public static List<Client> Get()
        {
            return new List<Client>
            {
                new Client
                {
                    ClientName = "Boardz Game Client",
                    Enabled = true,
                    ClientId = "boardzng",
                    ClientSecrets = new List<Secret>
                    {
                        new Secret("secret".Sha256())
                    },

                    Flow = Flows.ResourceOwner,

                    AllowedScopes = new List<string>
                    {
                        "default",
                    },

                    AllowedCorsOrigins = new List<string>()
                    {
                        "http://localhost:8000/"
                    },

                    AccessTokenType = AccessTokenType.Jwt,
                    AccessTokenLifetime = 3600,
                    AbsoluteRefreshTokenLifetime = 86400,
                    SlidingRefreshTokenLifetime = 43200,

                    RefreshTokenUsage = TokenUsage.OneTimeOnly,
                    RefreshTokenExpiration = TokenExpiration.Sliding
                }
            };
        }
    }
}
