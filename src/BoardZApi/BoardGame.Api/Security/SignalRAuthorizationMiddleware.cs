using System;
using System.Threading.Tasks;
using Microsoft.Owin;

namespace BoardGame.Api.Security
{
    public class SignalRAuthorizationMiddleware : OwinMiddleware
    {
        private static string _queryStringName = "authorization";
        private static string _authorizationHeaderName = "Authorization";

        public SignalRAuthorizationMiddleware(OwinMiddleware next) 
            : base(next)
        {
        }

        public override async Task Invoke(IOwinContext context)
        {
            var authorizationQueryStringValue = context.Request.Query[_queryStringName];

            if (authorizationQueryStringValue != null && !context.Request.Headers.ContainsKey(_authorizationHeaderName))
            {
                context.Request.Headers.Append(_authorizationHeaderName, "Bearer " + authorizationQueryStringValue);
            }

            await Next.Invoke(context);
        }
    }
}