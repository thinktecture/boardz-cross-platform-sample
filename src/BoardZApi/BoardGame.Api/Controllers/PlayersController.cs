using System;
using System.Web.Http;
using System.Web.Http.Description;
using BoardGame.Api.Models;
using BoardGame.Api.Services;

namespace BoardGame.Api.Controllers
{
    /// <summary>
    /// Provides an CRUD api for players
    /// </summary>
    [Authorize]
    public class PlayersController : ApiController, IDisposable
    {
        private readonly PlayerService _playersService;

        /// <summary>
        /// default ctor
        /// </summary>
        public PlayersController()
        {
            _playersService = new PlayerService();
        }

        /// <summary>
        /// Returns a list of players.
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [ResponseType(typeof(Player[]))]
        public IHttpActionResult List()
        {
            return Ok(_playersService.GetAll());
        }

        /// <summary>
        /// Returns the playing players count.
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [ResponseType(typeof(int))]
        public IHttpActionResult Count()
        {
            return Ok(_playersService.Count());
        }

        /// <summary>
        /// Adds a new player
        /// </summary>
        /// <param name="player"></param>
        /// <returns></returns>
        [HttpPost]
        [ResponseType(typeof(Guid))]
        public IHttpActionResult Add(Player player)
        {
            var result = _playersService.AddPlayer(player);

            return Ok(result);
        }

        /// <summary>
        /// Returns a single player
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet]
        [ResponseType(typeof(Player))]
        public IHttpActionResult Single(Guid id)
        {
            var player = _playersService.GetById(id);
            if (player == null)
            {
                return NotFound();
            }
            return Ok(player);
        }

        /// <summary>
        /// Removes a player
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete]
        public IHttpActionResult Remove(Guid id)
        {
            var success = _playersService.DeletePlayer(id);
            if (!success)
            {
                return InternalServerError();
            }
            return Ok();
        }

        /// <summary>
        /// Updates a player
        /// </summary>
        /// <param name="player"></param>
        /// <returns></returns>
        [HttpPut]
        public IHttpActionResult Update(Player player)
        {

            var success = _playersService.Update(player);
            if (!success)
            {
                return InternalServerError();
            }
            return Ok();
        }

        /// <summary>
        /// Finds all players nearby a coordinate within the given radius
        /// </summary>
        /// <param name="coordinate"></param>
        /// <param name="radius"></param>
        /// <returns></returns>
        [HttpGet]
        [ResponseType(typeof(PlayerWithDistance[]))]
        public IHttpActionResult FindNearby([FromUri] Coordinate coordinate, int radius)
        {
            return Ok(_playersService.FindPlayersNearby(coordinate, radius));
        }

        /// <summary>
        /// IDisposable
        /// </summary>
        /// <param name="disposing"></param>
        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
            if (_playersService != null)
            {
                _playersService.Dispose();
            }
        }
    }
}