using BoardGame.Api.Helpers;
using BoardGame.Api.Models;
using BoardGame.Api.Services;
using System;
using System.Collections.Generic;
using System.Web.Http;
using System.Web.Http.Description;

namespace BoardGame.Api.Controllers
{
    /// <summary>
    /// Categories Controller
    /// </summary>
    [Authorize]
    public class CategoriesController: BaseApiController, IDisposable
    {

        private readonly CategoriesService _categoriesService;

        /// <summary>
        /// default CTOR
        /// </summary>
        public CategoriesController()
        {
            _categoriesService = new CategoriesService();
        }

        /// <summary>
        /// Lists all categories
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public IEnumerable<Category> List()
        {
            return _categoriesService.GetAll(User.GetCurrentUsernameOrThrow());
        }

        /// <summary>
        /// Returns the categories count.
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [ResponseType(typeof(int))]
        public IHttpActionResult Count()
        {
            return Ok(_categoriesService.Count(User.GetCurrentUsernameOrThrow()));
        }

        /// <summary>
        /// Adds a new board game category
        /// </summary>
        /// <param name="category"></param>
        /// <returns></returns>
        [HttpPost]
        [ResponseType(typeof(Guid))]
        public IHttpActionResult Add(Category category)
        {
            var categoryId = _categoriesService.AddCategory(category, User.GetCurrentUsernameOrThrow());
            return Ok(categoryId);
        }

        /// <summary>
        /// Returns a single board game category
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet]
        [ResponseType(typeof(Category))]
        public IHttpActionResult Single(Guid id)
        {
            var category = _categoriesService.GetById(id, User.GetCurrentUsernameOrThrow());
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
        public IHttpActionResult Remove(Guid id)
        {
            var successs = _categoriesService.DeleteCategory(id);
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
        public IHttpActionResult Update(Category category)
        {
            var success = _categoriesService.Update(category, User.GetCurrentUsernameOrThrow());
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
            if (_categoriesService != null)
            {
                _categoriesService.Dispose();
            }
        }
    }
}
