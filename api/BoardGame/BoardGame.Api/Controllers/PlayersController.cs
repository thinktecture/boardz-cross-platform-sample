using System;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Description;
using BoardGame.Api.Helpers;
using BoardGame.Api.Models;
using BoardGame.Api.Storages;

namespace BoardGame.Api.Controllers
{
    /// <summary>
    /// Provides an CRUD api for players
    /// </summary>
    [Authorize]
    public class PlayersController : ApiController
    {
        private readonly IStorage<Models.Player> _storage;
        private readonly DistanceCalculator _distanceCalculator;

        public PlayersController(IStorage<Models.Player> storage, DistanceCalculator distanceCalculator)
        {
            _storage = storage;
            _distanceCalculator = distanceCalculator;
        }

        /// <summary>
        /// Returns a list of players.
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [ResponseType(typeof(Player[]))]
        public IHttpActionResult List()
        {
            return Ok(_storage.List());
        }

        /// <summary>
        /// Adds a new player
        /// </summary>
        /// <param name="player"></param>
        /// <returns></returns>
        [HttpPost]
        [ResponseType(typeof(Guid))]
        public IHttpActionResult Add(Models.Player player)
        {
            var result = _storage.Add(player);

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
            return Ok(_storage.Get(id));
        }

        /// <summary>
        /// Removes a player
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete]
        public IHttpActionResult Remove(Guid id)
        {
            _storage.Delete(id);
            return Ok();
        }

        /// <summary>
        /// Updates a player
        /// </summary>
        /// <param name="player"></param>
        /// <returns></returns>
        [HttpPut]
        public IHttpActionResult Update(Models.Player player)
        {
            _storage.Update(player);
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
            var result = _storage.List()
                .Where(i => i.Coordinate != null)
                .Select(c => new PlayerWithDistance()
                {
                    Player = c,
                    Distance = _distanceCalculator.CalculateDistance(coordinate, c.Coordinate)
                })
                .Where(c => c.Distance <= radius)
                .OrderBy(c => c.Distance)
                .ToList();

            return Ok(result);
        }

        private class PlayerWithDistance
        {
            public Player Player { get; set; }
            public double Distance { get; set; }
        }
    }
}