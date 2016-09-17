using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Data.Entity.SqlServer;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BoardGame.Api
{
    /// <summary>
    /// BoardZ SQL Azure Config
    /// </summary>
    internal class BoardzDatabaseConfiguration : DbConfiguration
    {
        /// <summary>
        /// default CTOR
        /// </summary>
        public BoardzDatabaseConfiguration()
        {
            SetExecutionStrategy("System.Data.SqlClient", () => new SqlAzureExecutionStrategy());
            SetDefaultConnectionFactory(new LocalDbConnectionFactory("v11.0"));
        }
    }
}
