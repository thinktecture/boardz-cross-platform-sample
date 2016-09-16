using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace BoardGame.Api.Controllers
{
    /// <summary>
    /// Status Controller is responsible for exposing the ping endpoint which will be used
    /// to verify online/offline status from the client
    /// </summary>
    public class StatusController : ApiController
    {
        /// <summary>
        /// Ping endpoint - Just returning a HTTP StatusCode 200
        /// </summary>
        [HttpGet]
        public HttpResponseMessage Ping()
        {
            return Request.CreateResponse(HttpStatusCode.OK);
        }
    }
}
