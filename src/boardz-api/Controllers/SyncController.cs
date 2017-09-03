using System;
using System.Collections.Generic;
using System.Linq;
using BoardZ.API.Extensions;
using BoardZ.API.Models;
using BoardZ.API.Services;
using Microsoft.AspNetCore.Mvc;

namespace BoardZ.API.Controllers
{
    /// <summary>
    /// SnycController
    /// </summary>
    [Route("api/sync")]
    public class SyncController : Controller, IDisposable
    {
        protected GamesService GamesService { get; }
        protected CategoriesService CategoriesService { get; }

        /// <summary>
        /// Sync Controller Default CTOR
        /// </summary>
        public SyncController(GamesService gamesService, CategoriesService categoriesService)
        {
            GamesService = gamesService;
            CategoriesService = categoriesService;
        }

        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
            GamesService?.Dispose();
            CategoriesService?.Dispose();
            
        }

        /// <summary>
        /// Sync games
        /// </summary>
        /// <param name="games"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("games")]
        public IActionResult SyncGames([FromBody] IEnumerable<Game> games)
        {
            if (games == null)
            {
                return BadRequest("No data present");
            }
            var userName = User.GetSubjectOrThrow();
            var transaction = GamesService.NewTransaction();
            try
            {
                //games
                //    .Where(game => game.ModelState == Models.ModelState.New)
                //    .ToList()
                //    .ForEach(game => GamesService.AddGame(game, userName));

                games
                    .Where(game => game.ModelState == Models.ModelState.Modified)
                    .ToList()
                    .ForEach(game => GamesService.Update(game, userName));

                games
                    .Where(game => game.ModelState == Models.ModelState.Deleted)
                    .Select(game => game.Id)
                    .ToList()
                    .ForEach(gameId => GamesService.DeleteGame(gameId));
            }
            catch (Exception)
            {
                transaction.Rollback();
                throw;
            }
            finally
            {
                transaction.Commit();
            }
            return Ok();
        }

        /// <summary>
        /// sync all categories
        /// </summary>
        /// <param name="categories"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("categories")]
        public IActionResult SyncCategories([FromBody] IEnumerable<Category> categories)
        {
            // will return latest rowVersion after sync
            if (categories == null)
            {
                return BadRequest("No data present");
            }
            var userName = User.GetSubjectOrThrow();
            var transaction = CategoriesService.NewTransaction();
            try
            {
                categories
                    .Where(category => category.ModelState == Models.ModelState.New)
                    .ToList()
                    .ForEach(category => CategoriesService.AddCategory(category, userName));

                categories
                    .Where(category => category.ModelState == Models.ModelState.Modified)
                    .ToList()
                    .ForEach(category => CategoriesService.Update(category, userName));

                categories
                    .Where(category => category.ModelState == Models.ModelState.Deleted)
                    .Select(category => category.Id)
                    .ToList()
                    .ForEach(categoryId => CategoriesService.DeleteCategory(categoryId));
            }
            catch (Exception)
            {
                transaction.Rollback();
                throw;
            }
            finally
            {
                transaction.Commit();
            }
            return Ok();
        }
    }
}
