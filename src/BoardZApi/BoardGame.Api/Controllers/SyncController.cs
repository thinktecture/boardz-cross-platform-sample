using BoardGame.Api.Helpers;
using BoardGame.Api.Models;
using BoardGame.Api.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

namespace BoardGame.Api.Controllers
{
    /// <summary>
    /// SnycController
    /// </summary>
    [Authorize]
    public class SyncController : ApiController
    {
        private GamesService _gamesService;
        private CategoriesService _categoriesService;

        /// <summary>
        /// Sync Controller Default CTOR
        /// </summary>
        public SyncController()
        {
            _gamesService = new GamesService();
            _categoriesService = new CategoriesService();
        }

        /// <summary>
        /// Sync games
        /// </summary>
        /// <param name="games"></param>
        /// <returns></returns>
        [HttpPost]
        public HttpResponseMessage SyncGames([FromBody]IEnumerable<Game> games)
        {
            if (games == null)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, new HttpError("No data passed"));
            }
            var userName = User.GetCurrentUsernameOrThrow();
            var transaction = _gamesService.NewTransaction();
            try
            {
                games
                    .Where(game => game.ModelState == Models.ModelState.New)
                    .ToList()
                    .ForEach(game => _gamesService.AddGame(game, userName));

                games
                    .Where(game => game.ModelState == Models.ModelState.Modified)
                    .ToList()
                    .ForEach(game => _gamesService.Update(game, userName));

                games
                    .Where(game => game.ModelState == Models.ModelState.Deleted)
                    .Select(game => game.Id)
                    .ToList()
                    .ForEach(gameId => _gamesService.DeleteGame(gameId));
            }
            catch(Exception ex)
            {
                transaction.Rollback();
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex);
            }
            finally
            {
                transaction.Commit();
            }
            return Request.CreateResponse(HttpStatusCode.OK);

        }

        /// <summary>
        /// sync all categories
        /// </summary>
        /// <param name="categories"></param>
        /// <returns></returns>
        [HttpPost]
        public HttpResponseMessage SyncCategories([FromBody]IEnumerable<Category> categories)
        {
            // will return latest rowVersion after sync
            if (categories == null)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, new HttpError("No data passed"));
            }
            var userName = User.GetCurrentUsernameOrThrow();
            var transaction = _categoriesService.NewTransaction();
            try
            {
                categories
                    .Where(category => category.ModelState == Models.ModelState.New)
                    .ToList()
                    .ForEach(category => _categoriesService.AddCategory(category, userName));

                categories
                    .Where(category => category.ModelState == Models.ModelState.Modified)
                    .ToList()
                    .ForEach(category => _categoriesService.Update(category, userName));

                categories
                    .Where(category => category.ModelState == Models.ModelState.Deleted)
                    .Select(category => category.Id)
                    .ToList()
                    .ForEach(categoryId => _categoriesService.DeleteCategory(categoryId));
            }
            catch (Exception ex)
            {
                transaction.Rollback();
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex);
            }
            finally
            {
                transaction.Commit();
            }
            return Request.CreateResponse(HttpStatusCode.OK);
        }


    }
}
