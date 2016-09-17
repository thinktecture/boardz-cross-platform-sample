using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

namespace BoardGame.Api.Controllers
{
    /// <summary>
    /// Base ApiController class
    /// </summary>
    public class BaseApiController: ApiController
    {
        /// <summary>
        /// Converts a string or null to a valid RowVersion
        /// </summary>
        /// <param name="rowVersion"></param>
        /// <returns></returns>
        protected byte[] GetRowVersion(string rowVersion = null)
        {
            return rowVersion != null ? Convert.FromBase64String(rowVersion) : null;
        }
    }
}
