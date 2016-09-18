using System;
using BoardGame.Api;
using System.Linq;
using Microsoft.Owin.Hosting;
using System.Data.Entity;
using BoardGame.Api.Migrations;

namespace BoardGame.Host
{
    class Program
    {
        static void Main(string[] args)
        {
            Database.SetInitializer(new MigrateDatabaseToLatestVersion<BoardzContext, Configuration>());
            using (WebApp.Start<Startup>("http://+:8080"))
            {
                Console.WriteLine("Server is up and running");
                Console.ReadLine();
            }
        }
    }
}
