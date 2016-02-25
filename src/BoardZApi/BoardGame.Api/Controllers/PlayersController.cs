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
        private readonly IStorage<Models.Player> _playerStorage;
        private readonly IStorage<Models.BoardGame> _boardGamesStorage;
        private readonly DistanceCalculator _distanceCalculator;

        public PlayersController(IStorage<Models.Player> playerStorage, IStorage<Models.BoardGame> boardGamesStorage,
            DistanceCalculator distanceCalculator)
        {
            _playerStorage = playerStorage;
            _boardGamesStorage = boardGamesStorage;
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
            return Ok(_playerStorage.List());
        }

        /// <summary>
        /// Returns the playing players count.
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [ResponseType(typeof(int))]
        public IHttpActionResult PlayerCount()
        {
            return Ok(_playerStorage.Count());
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
            var result = _playerStorage.Add(player);

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
            return Ok(_playerStorage.Get(id));
        }

        /// <summary>
        /// Removes a player
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete]
        public IHttpActionResult Remove(Guid id)
        {
            _playerStorage.Delete(id);
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
            _playerStorage.Update(player);
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
            var result = _playerStorage.List()
                .Where(i => i.Coordinate != null)
                .Select(p =>
                {
                    try
                    {
                        p.BoardGameName = _boardGamesStorage.Get(p.BoardGameId).Name;
                    }
                    catch
                    {
                        // Silently fail, we didn't get the game. Can occur in dev 
                    }

                    return p;
                })
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