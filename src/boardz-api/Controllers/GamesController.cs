using System;
using System.Net;
using BoardZ.API.Extensions;
using BoardZ.API.Models;
using BoardZ.API.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Linq;

namespace BoardZ.API.Controllers
{
    /// <summary>
    /// Provides a CRUD api for board games
    /// </summary>
    [Route("/api/[controller]")]
    public class GamesController : BaseApiController
    {
        protected GamesService Service { get; }

        /// <summary>
        /// default CTOR
        /// </summary>
        public GamesController(GamesService service)
        {
            Service = service;
        }

        /// <summary>
        /// Method for loading games since a given row version
        /// </summary>
        /// <param name="rowVersion"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("since")]
        public IActionResult GetAllSince(ulong? rowVersion)
        {
            var username = User.GetSubjectOrThrow();
            return Json(Service.GetAll(username, rowVersion).Select(g=> GameDTO.FromGame(g)));
        }

        /// <summary>
        /// Lists all games
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("")]
        public IActionResult GetAll()
        {
            var username = User.GetSubjectOrThrow();
            return Json(Service.GetAll(username).Select(g=>GameDTO.FromGame(g)));
        }

        /// <summary>
        /// Returns the games count.
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("count")]
        public IActionResult GetCount()
        {
            return Ok(Service.GetCount(User.GetSubjectOrThrow()));
        }

        /// <summary>
        /// Adds a new board game
        /// </summary>
        /// <param name="transferObject"></param>
        /// <returns></returns>
        [HttpPost] 
        [Route("")]
        public IActionResult Add([FromBody]GameDTO transferObject)
        {
            var game = Game.FromDTO(transferObject, User.GetSubjectOrThrow());
            var newGameId = Service.AddGame(game);
            return Ok(newGameId);
        }

        /// <summary>
        /// Returns a single board game
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("{id}")]
        public IActionResult GetById(Guid id)
        {
            var game = Service.GetById(id, User.GetSubjectOrThrow());
            if (game == null)
            {
                return NotFound();
            }
            var transferObject = GameDTO.FromGame(game);
            return Ok(transferObject);
        }

        /// <summary>
        /// Removes a board game
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete]
        [Route("{id}")]
        public IActionResult Remove(Guid id)
        {
            var successs = Service.DeleteGame(id);
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
        [Route("{id}")]
        public IActionResult Update([FromBody]GameDTO transferObject)
        {
            var userName = User.GetSubjectOrThrow();
            var game = Game.FromDTO(transferObject, userName);
            var success = Service.Update(game, userName);
            if (!success)
            {
                return StatusCode((int) HttpStatusCode.InternalServerError);
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
            Service?.Dispose();
        }
    }
}
