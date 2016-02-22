using System;
using BoardGame.Api.Helpers;
using Microsoft.AspNet.SignalR;

namespace BoardGame.Api.Hubs
{
    public class PlayerHub : Hub<IPlayer>
    {
        public void IAmPlaying(string playerName, string game)
        {
            Console.WriteLine("Player {0} is now playing {1}", playerName, game);
            Clients.Others.SomeoneStartedPlaying(playerName, game);
        }
    }
}