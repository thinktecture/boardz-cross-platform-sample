using System;
using System.IO;
using Microsoft.Owin;
using Microsoft.Owin.Cors;
using Microsoft.Owin.Security.OAuth;
using Owin;

namespace BoardGame.Api.Security
{
    public class SecurityStartup
    {
        public static void Configuration(IAppBuilder appBuilder)
        {
            appBuilder.UseCors(CorsOptions.AllowAll);
                
            appBuilder.UseOAuthAuthorizationServer(new OAuthAuthorizationServerOptions()
            {
                TokenEndpointPath = new PathString("/token"),
                AccessTokenExpireTimeSpan = TimeSpan.FromDays(365),
                AllowInsecureHttp = true,
                Provider = new AuthorizationServerProvider()
            });

            appBuilder.UseOAuthBearerAuthentication(new OAuthBearerAuthenticationOptions());
        } 
    }
}