using System;
using System.Net;
using BoardZ.API.Extensions;
using BoardZ.API.Models;
using BoardZ.API.Services;
using Microsoft.AspNetCore.Mvc;

namespace BoardZ.API.Controllers
{
    /// <summary>
    /// Provides an CRUD api for players
    /// </summary>
    [Route("/api/[controller]")]
    public class PlayersController : BaseApiController, IDisposable
    {
        protected PlayersService Service { get; }

        /// <summary>
        /// default ctor
        /// </summary>
        public PlayersController(PlayersService service)
        {
            Service = service;
        }

        /// <summary>
        /// Returns a list of players.
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("")]
        public IActionResult GetAll()
        {
            return Ok(Service.GetAll());
        }

        /// <summary>
        /// Returns the playing players count.
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("count")]
        public IActionResult GetCount()
        {
            return Ok(Service.GetCount());
        }

        /// <summary>
        /// Adds a new player
        /// </summary>
        /// <param name="player"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("")]
        public IActionResult Add([FromBody]Player player)
        {
            var result = Service.AddPlayer(player);

            return Ok(result);
        }

        /// <summary>
        /// Returns a single player
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("{id}")]
        public IActionResult GetById(Guid id)
        {
            var player = Service.GetById(id);
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
        [Route("{id}")]
        public IActionResult Remove(Guid id)
        {
            var success = Service.DeletePlayer(id);
            if (!success)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError);
            }
            return Ok();
        }

        /// <summary>
        /// Updates a player
        /// </summary>
        /// <param name="player"></param>
        /// <returns></returns>
        [HttpPut]
        [Route("{id}")]
        public IActionResult Update([FromBody]Player player)
        {

            var success = Service.Update(player, User.GetSubjectOrThrow());
            if (!success)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError);
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
        [Route("nearby")]
        public IActionResult GetNearBy([FromQuery]Coordinate coordinate, [FromQuery]int radius)
        {
            return Ok(Service.FindPlayersNearby(coordinate, radius));
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