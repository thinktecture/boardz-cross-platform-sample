using System;
using Microsoft.AspNetCore.Mvc;

namespace BoardZ.API.Controllers
{
    /// <summary>
    /// Base ApiController class
    /// </summary>
    public class BaseApiController : Controller
    {
        /// <summary>
        /// Converts a string or null to a valid RowVersion
        /// </summary>
        /// <param name="rowVersion"></param>
        /// <returns></returns>
        protected byte[] GetRowVersion(int? rowVersion)
        {
            return rowVersion.HasValue ? Convert.FromBase64String(rowVersion.Value.ToString()) : null;
        }
    }
}
