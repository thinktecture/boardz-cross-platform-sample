using System;
using BoardGame.Api;
using Microsoft.Owin.Hosting;

namespace BoardGame.Host
{
    class Program
    {
        static void Main(string[] args)
        {
            using (WebApp.Start<Startup>("http://+:8080"))
            {
                Console.WriteLine("Server is up and running");
                Console.ReadLine();
            }
        }
    }
}
