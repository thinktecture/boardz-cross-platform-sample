using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BoardGame.Api
{
    public class FullStartup : IDisposable
    {
        private IDisposable apiApp;
        private IDisposable identityManagerApp;
        private IDisposable identityServerApp;

        public FullStartup(
            Func<IDisposable> apiStartupCall,
            Func<IDisposable> identityManagerStartupCall,
            Func<IDisposable> identityServerStartupCall
        )
        {
            apiApp = apiStartupCall();
            identityManagerApp = identityManagerStartupCall();
            identityServerApp = identityServerStartupCall();
        }

        #region IDisposable Support
        private bool disposedValue = false; // To detect redundant calls

        protected virtual void Dispose(bool disposing)
        {
            if (!disposedValue)
            {
                if (disposing)
                {
                    identityManagerApp.Dispose();
                    identityManagerApp = null;

                    identityServerApp.Dispose();
                    identityServerApp = null;

                    apiApp.Dispose();
                    apiApp = null;
                }

                disposedValue = true;
            }
        }

        // This code was added to correctly implement the disposable pattern.
        public void Dispose()
        {
            // Do not change this code. Put cleanup code in Dispose(bool disposing) above.
            Dispose(true);
        }
        #endregion
    }
}
