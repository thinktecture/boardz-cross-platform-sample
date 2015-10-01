using System.Web.Http;

namespace BoardGame.Api.Controllers
{
    [Authorize]
    public class BoardGamesController : ApiController
    {
        public IHttpActionResult Get()
        {
            return Ok("Ai Gude!");
        }
    }
}