using System;
using System.Web.Http;
using BoardGame.Api.Storages;

namespace BoardGame.Api.Controllers
{
    [Authorize]
    public class BoardGamesController : ApiController
    {
        private readonly IStorage<Models.BoardGame> _storage;

        public BoardGamesController(IStorage<Models.BoardGame> storage)
        {
            _storage = storage;
        }
        
        [HttpGet]
        public IHttpActionResult List()
        {
            return Ok(_storage.List());
        }
        
        [HttpPost]
        public IHttpActionResult Add(Models.BoardGame game)
        {
            var result = _storage.Add(game);

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
        public IHttpActionResult Update(Models.BoardGame game)
        {
            _storage.Update(game);
            return Ok();
        }
    }
}