using System;
using System.Linq;
using System.Security.Claims;
using System.Web.Http;
using System.Web.Http.Description;
using BoardGame.Api.Helpers;
using BoardGame.Api.Storages;

namespace BoardGame.Api.Controllers
{
    /// <summary>
    /// Provides a CRUD api for board games
    /// </summary>
    [Authorize]
    public class BoardGamesController : ApiController
    {
        private readonly IStorage<Models.BoardGame> _storage;
        
        public BoardGamesController(IStorage<Models.BoardGame> storage)
        {
            _storage = storage;
        }
        
        /// <summary>
        /// Lists all players
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [ResponseType(typeof(Models.BoardGame[]))]
        public IHttpActionResult List()
        {
            var username = User.GetCurrentUsernameOrThrow();
            return Ok(_storage.List().Where(g => g.UserName == username).ToList());
        }

        /// <summary>
        /// Returns the games count.
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [ResponseType(typeof(int))]
        public IHttpActionResult GameCount()
        {
            return Ok(_storage.Count());
        }

        /// <summary>
        /// Adds a new board game
        /// </summary>
        /// <param name="game"></param>
        /// <returns></returns>
        [HttpPost]
        [ResponseType(typeof(Guid))]
        public IHttpActionResult Add(Models.BoardGame game)
        {
            game.UserName = User.GetCurrentUsernameOrThrow();
            var result = _storage.Add(game);

            return Ok(result);
        }
        
        /// <summary>
        /// Returns a single board game
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet]
        [ResponseType(typeof(Models.BoardGame))]
        public IHttpActionResult Single(Guid id)
        {
            return Ok(_storage.Get(id));
        }
        
        /// <summary>
        /// Removes a board game
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
        /// Updates a board game
        /// </summary>
        /// <param name="game"></param>
        /// <returns></returns>
        [HttpPut]
        public IHttpActionResult Update(Models.BoardGame game)
        {
            game.UserName = User.GetCurrentUsernameOrThrow();
            _storage.Update(game);
            return Ok();
        }
    }
}