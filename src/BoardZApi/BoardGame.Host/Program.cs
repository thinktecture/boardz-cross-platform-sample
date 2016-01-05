using System;
using BoardGame.Api;
using Microsoft.Owin.Hosting;

namespace BoardGame.Host
{
    class Program
    {
        static void Main(string[] args)
        {
            using (WebApp.Start<StartupApi>("http://+:8080")) // TODO: use SSL for production
            {
                Console.WriteLine("Started up Web API");

                using (WebApp.Start<StartupIdentityServer>("http://+:8000")) // TODO: use SSL for production
                {
                    Console.WriteLine("Started up IdentityServer");

                    using (WebApp.Start<StartupIdentityManager>("https://+:44333"))
                    {
                        Console.WriteLine("Started up Identity Manager");

                        Console.WriteLine("Server is up and running");
                        Console.ReadLine();
                    }
                }
            }
        }
    }
}
