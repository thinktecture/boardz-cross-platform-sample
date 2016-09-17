using System;
using System.Web.Http;
using System.Web.Http.Description;
using BoardGame.Api.Helpers;
using BoardGame.Api.Services;
using BoardGame.Api.Models;

namespace BoardGame.Api.Controllers
{
    /// <summary>
    /// Provides a CRUD api for board games
    /// </summary>
    [Authorize]
    public class GamesController : ApiController, IDisposable
    {
        private readonly GameService _gameService;
        
        /// <summary>
        /// default CTOR
        /// </summary>
        public GamesController()
        {
            _gameService = new GameService();
        }
        
        /// <summary>
        /// Lists all games
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [ResponseType(typeof(Game[]))]
        public IHttpActionResult List()
        {
            var username = User.GetCurrentUsernameOrThrow();
            return Ok(_gameService.GetAll(username));
        }

        /// <summary>
        /// Returns the games count.
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [ResponseType(typeof(int))]
        public IHttpActionResult GameCount()
        {
            return Ok(_gameService.Count(User.GetCurrentUsernameOrThrow()));
        }

        /// <summary>
        /// Adds a new board game
        /// </summary>
        /// <param name="game"></param>
        /// <returns></returns>
        [HttpPost]
        [ResponseType(typeof(Guid))]
        public IHttpActionResult Add(Game game)
        {
            var gameId = _gameService.AddGame(game, User.GetCurrentUsernameOrThrow());
            return Ok(gameId);
        }
        
        /// <summary>
        /// Returns a single board game
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet]
        [ResponseType(typeof(Game))]
        public IHttpActionResult Single(Guid id)
        {
            var game = _gameService.GetById(id, User.GetCurrentUsernameOrThrow());
            if (game == null)
            {
                return NotFound();
            }
            return Ok(game);
        }
        
        /// <summary>
        /// Removes a board game
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete]
        public IHttpActionResult Remove(Guid id)
        {
            var successs = _gameService.DeleteGame(id);
            if (!successs)
            {
                return NotFound();
            }
            return Ok();
        }
        
        /// <summary>
        /// Updates a board game
        /// </summary>
        /// <param name="game"></param>
        /// <returns></returns>
        [HttpPut]
        public IHttpActionResult Update(Game game)
        {
            var success =_gameService.Update(game, User.GetCurrentUsernameOrThrow());
            if (!success)
            {
                return InternalServerError();
            }
            return Ok();
        }

        /// <summary>
        /// IDisposable
        /// </summary>
        /// <param name="disposing"></param>
        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
            if (_gameService != null)
            {
                _gameService.Dispose();
            }
        }
    }
}