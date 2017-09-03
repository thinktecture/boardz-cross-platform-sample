using System;
using System.Collections.Generic;
using System.Linq;
using BoardZ.API.Database;
using BoardZ.API.Helpers;
using BoardZ.API.Models;
using Microsoft.EntityFrameworkCore;

namespace BoardZ.API.Services
{
    public class PlayersService : IDisposable
    {
        protected BoardZContext Context { get; }
        protected DistanceCalculator DistanceCalculator { get; }

        public PlayersService(BoardZContext context, DistanceCalculator distanceCalculator)
        {
            Context = context;
            DistanceCalculator = distanceCalculator;
        }

        public IList<PlayerWithDistance> FindPlayersNearby(Coordinate coordinates, int radius)
        {
            var players = Context.Players
                .Include(player => player.Coordinate)
                .Include(player => player.Game).ToList();

            return players
                .Where(player => player.PlayingSince > DateTime.Now.AddDays(-5))
                .Select(c => new PlayerWithDistance()
                {
                    Player = c,
                    Distance = DistanceCalculator.CalculateDistance(coordinates, c.Coordinate)
                })
                .Where(c => c.Distance <= radius)
                .OrderBy(c => c.Distance)
                
                .ToList();
        }

        public bool Update(Player player, string username)
        {
            try
            {
                Context.Players.Attach(player);
                Context.Entry(player).State = EntityState.Modified;
                Context.SaveChanges();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public bool DeletePlayer(Guid id)
        {
            var found = Context.Players
                .FirstOrDefault(player => player.Id.Equals(id));
            if (found == null)
            {
                return false;
            }
            try
            {
                Context.Entry(found).State = EntityState.Deleted;
                Context.SaveChanges();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public Player GetById(Guid id)
        {
            return Context.Players
                .FirstOrDefault(player => player.Id.Equals(id));
        }

        public Guid AddPlayer(Player player)
        {
            player.Id = Guid.NewGuid();
            player.PlayingSince = DateTime.Now;
            Context.Players.Add(player);
            Context.SaveChanges();
            return player.Id;
        }

        public int GetCount()
        {
            return Context.Players.Count(player => player.PlayingSince.Date.Equals(DateTime.Now.Date));
        }

        public IList<Player> GetAll()
        {
            return Context.Players
                .Include(player => player.Coordinate)
                .Include(player => player.Game)
                .ToList();
        }

        public void Dispose()
        {
            Context?.Dispose();
        }
    }
}
