namespace BoardGame.Api.Hubs
{
    public interface IPlayer
    {
        void SomeoneStartedPlaying(string name, string game);
    }
}