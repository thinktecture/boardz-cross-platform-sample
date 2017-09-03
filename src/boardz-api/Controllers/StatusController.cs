using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BoardZ.API.Controllers
{
    /// <summary>
    /// Status Controller is responsible for exposing the ping endpoint which will be used
    /// to verify online/offline status from the client
    /// </summary>
    [AllowAnonymous]
    [Route("api/[controller]")]
    public class StatusController : Controller
    {
        /// <summary>
        /// Ping endpoint - Just returning a HTTP StatusCode 200
        /// </summary>
        [HttpGet]
        [Route("ping")]
        public IActionResult GetPing()
        {
            return Ok();
        }
    }
}
