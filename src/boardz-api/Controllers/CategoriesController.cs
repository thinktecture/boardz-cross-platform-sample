using System;
using System.Net;
using BoardZ.API.Extensions;
using BoardZ.API.Models;
using BoardZ.API.Services;
using Microsoft.AspNetCore.Mvc;

namespace BoardZ.API.Controllers
{
    /// <summary>
    /// Categories Controller
    /// </summary>
    [Route("/api/[controller]")]
    public class CategoriesController : BaseApiController, IDisposable
    {
        protected CategoriesService Service { get; }

        /// <summary>
        /// default CTOR
        /// </summary>
        public CategoriesController(CategoriesService service)
        {
            Service = service;
        }

        /// <summary>
        /// Method for loading categories since a given row version
        /// </summary>
        /// <param name="rowVersion"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("since")]
        public IActionResult GetAllSince(int? rowVersion)
        {
            var rv = GetRowVersion(rowVersion);
            var username = User.GetSubjectOrThrow();
            var games = Service.GetAll(username, rv);

            return Json(games);
        }

        /// <summary>
        /// Lists all categories
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("")]
        public IActionResult GetAll()
        {
            return Json(Service.GetAll(User.GetSubjectOrThrow()));
        }

        /// <summary>
        /// Returns the categories count.
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("count")]
        public IActionResult GetCount()
        {
            return Ok(Service.GetCount(User.GetSubjectOrThrow()));
        }

        /// <summary>
        /// Adds a new board game category
        /// </summary>
        /// <param name="category"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("")]
        public IActionResult Add([FromBody]Category category)
        {
            var categoryId = Service.AddCategory(category, User.GetSubjectOrThrow());
            return Ok(categoryId);
        }

        /// <summary>
        /// Returns a single board game category
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("{id}")]
        public IActionResult GetById(Guid id)
        {
            var category = Service.GetById(id, User.GetSubjectOrThrow());
            if (category == null)
            {
                return NotFound();
            }
            return Ok(category);
        }

        /// <summary>
        /// Removes a board game category
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete]
        [Route("{id}")]
        public IActionResult Remove(Guid id)
        {
            var successs = Service.DeleteCategory(id);
            if (!successs)
            {
                return NotFound();
            }
            return Ok();
        }

        /// <summary>
        /// Updates a board game category
        /// </summary>
        /// <param name="category"></param>
        /// <returns></returns>
        [HttpPut]
        [Route("{id}")]
        public IActionResult Update([FromBody]Category category)
        {
            var success = Service.Update(category, User.GetSubjectOrThrow());
            return !success ? StatusCode((int) HttpStatusCode.InternalServerError) : Ok();
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
