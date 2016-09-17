using System;
using BoardGame.Api;
using System.Linq;
using Microsoft.Owin.Hosting;

namespace BoardGame.Host
{
    class Program
    {
        static void Main(string[] args)
        {
            //Ensure EF generates the database

            using (var ctx = new BoardzContext())
            {
                Console.WriteLine("Context initialized");
                Console.WriteLine($"There are {ctx.Games.Count()} Games in your database");
            }

            using (WebApp.Start<Startup>("http://+:8080"))
            {
                Console.WriteLine("Server is up and running");
                Console.ReadLine();
            }
        }
    }
}
