using System;
using BoardGame.Api;
using Microsoft.Owin.Hosting;

namespace BoardGame.Host
{
    class Program
    {
        static void Main(string[] args)
        {
            using (new FullStartup(
                () => WebApp.Start<ApiStartup>("http://+:8080"), // TODO: use SSL for production
                () => WebApp.Start<IdentityManagerStartup>("https://+:44333"),
                () => WebApp.Start<IdentityServerStartup>("http://+:8000") // TODO: use SSL for production
                ))
            {
                Console.WriteLine("Server is up and running");
                Console.ReadLine();
            }
        }
    }
}
