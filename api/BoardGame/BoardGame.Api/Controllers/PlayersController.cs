using System;
using System.Linq;
using System.Web.Http;
using BoardGame.Api.Helpers;
using BoardGame.Api.Models;
using BoardGame.Api.Storages;

namespace BoardGame.Api.Controllers
{
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

        [HttpGet]
        public IHttpActionResult List()
        {
            return Ok(_storage.List());
        }

        [HttpPost]
        public IHttpActionResult Add(Models.Player player)
        {
            var result = _storage.Add(player);

            return Ok(result);
        }

        [HttpGet]
        public IHttpActionResult Single(Guid id)
        {
            return Ok(_storage.Get(id));
        }

        [HttpDelete]
        public IHttpActionResult Remove(Guid id)
        {
            _storage.Delete(id);
            return Ok();
        }

        [HttpPut]
        public IHttpActionResult Update(Models.Player player)
        {
            _storage.Update(player);
            return Ok();
        }

        [HttpGet]
        public IHttpActionResult FindNearby([FromUri] Coordinate coordinate, int radius)
        {
            var result = _storage.List()
                .Where(i => i.Coordinate != null)
                .Select(c => new
                {
                    Player = c,
                    Distance = _distanceCalculator.CalculateDistance(coordinate, c.Coordinate)
                })
                .Where(c => c.Distance <= radius)
                .OrderBy(c => c.Distance)
                .ToList();

            return Ok(result);
        }
    }
}