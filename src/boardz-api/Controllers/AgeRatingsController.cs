using System;
using BoardZ.API.Extensions;
using BoardZ.API.Services;
using Microsoft.AspNetCore.Mvc;

namespace BoardZ.API.Controllers
{
    [Route("/api/[controller]")]
    public class AgeRatingsController : BaseApiController, IDisposable
    {
        protected AgeRatingsService Service { get; }

        public AgeRatingsController(AgeRatingsService service)
        {
            Service = service;
        }

        /// <summary>
        /// Lists all ageRatings
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public IActionResult GetAll()
        {
            return Json(Service.GetAll(User.GetSubjectOrThrow()));
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
