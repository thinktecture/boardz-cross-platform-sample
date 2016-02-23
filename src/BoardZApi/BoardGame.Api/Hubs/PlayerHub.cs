using System;
using BoardGame.Api.Helpers;
using Microsoft.AspNet.SignalR;

namespace BoardGame.Api.Hubs
{
    [Authorize]
    public class PlayerHub : Hub<IPlayer>
    {
        public void IAmPlaying(string game)
        {
            Clients.Others.SomeoneStartedPlaying(Context.User.GetCurrentUsernameOrThrow(), game);
        }
    }
}