using BoardGame.Api.Models;
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
    public class SyncController : ApiController
    {
        /// <summary>
        /// Sync games
        /// </summary>
        /// <param name="games"></param>
        /// <returns></returns>
        [HttpPost]
        public HttpResponseMessage SyncGames([FromBody]IEnumerable<Game> games)
        {
            // will return latest rowVersion after sync
            return Request.CreateResponse(HttpStatusCode.OK, 123123123);
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
            return Request.CreateResponse(HttpStatusCode.OK, 123123123);
        }


    }
}
