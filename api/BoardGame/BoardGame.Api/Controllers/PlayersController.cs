using System;
using System.Web.Http;
using BoardGame.Api.Storages;

namespace BoardGame.Api.Controllers
{
    [Authorize]
    public class PlayersController : ApiController
    {
        private readonly IStorage<Models.Player> _storage;

        public PlayersController(IStorage<Models.Player> storage)
        {
            _storage = storage;
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
    }
}