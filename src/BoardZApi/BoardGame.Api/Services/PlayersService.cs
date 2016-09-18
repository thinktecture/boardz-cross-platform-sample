using BoardGame.Api.Helpers;
using BoardGame.Api.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Core.Objects;
using System.Linq;

namespace BoardGame.Api.Services
{
    /// <summary>
    /// PlayerService
    /// </summary>
    public class PlayersService : IDisposable
    {
        private readonly BoardzContext _dbContext;
        private readonly DistanceCalculator _distanceCalculator;
        /// <summary>
        /// Default CTOR
        /// </summary>
        public PlayersService()
        {
            _dbContext = new BoardzContext();
            _distanceCalculator = new DistanceCalculator();
        }

        internal IEnumerable<Player> GetAll()
        {
            return _dbContext.Players.Include(player=>player.Coordinate).Include(player=>player.Game);
        }

        /// <summary>
        /// Return a list of playeres (playing since 5 days :D) playing nearby a given coordiante
        /// </summary>
        /// <param name="queryCoordinates"></param>
        /// <param name="radius"></param>
        /// <returns></returns>
        public IEnumerable<PlayerWithDistance> FindPlayersNearby(Coordinate queryCoordinates, int radius)
        {
            var players = _dbContext.Players
                .Include(player => player.Coordinate)
                .Include(player => player.Game).ToList();

            return players
                .Where(player => player.PlayingSince > DateTime.Now.AddDays(-5))
                .Select(c => new PlayerWithDistance()
                {
                    Player = c,
                    Distance = _distanceCalculator.CalculateDistance(queryCoordinates, c.Coordinate)
                })
                .Where(c => c.Distance <= radius)
                .OrderBy(c => c.Distance);
        }

        /// <summary>
        /// Get the number of active players
        /// </summary>
        /// <returns></returns>
        internal int Count()
        {
            var players = _dbContext.Players.ToList();
            return players.Where(player => player.PlayingSince.Date.Equals(DateTime.Now.Date)).Count();
        }

        internal Player GetById(Guid playerId)
        {
            return _dbContext.Players.FirstOrDefault(player => player.Id.Equals(playerId));
        }

        /// <summary>
        /// Checkin
        /// </summary>
        /// <param name="player"></param>
        /// <returns></returns>
        public Guid AddPlayer(Player player)
        {
            player.Id = Guid.NewGuid();
            player.PlayingSince = DateTime.Now;
            _dbContext.Players.Add(player);
            _dbContext.SaveChanges();
            return player.Id;
        }

        /// <summary>
        /// Delete a player by his/her id
        /// </summary>
        /// <param name="playerId"></param>
        /// <returns></returns>
        internal bool DeletePlayer(Guid playerId)
        {
            var found = _dbContext.Players.FirstOrDefault(player => player.Id.Equals(playerId));
            if (found == null)
            {
                return false;
            }
            try
            {
                _dbContext.Entry(found).State = EntityState.Deleted;
                _dbContext.SaveChanges();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        /// <summary>
        /// update an existing player instance
        /// </summary>
        /// <param name="player"></param>
        /// <returns></returns>
        internal bool Update(Player player)
        {
            try
            {
                _dbContext.Players.Attach(player);
                _dbContext.Entry(player).State = EntityState.Modified;
                _dbContext.SaveChanges();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        /// <summary>
        /// IDisposable
        /// </summary>
        public void Dispose()
        {
            if(_dbContext != null)
            {
                _dbContext.Dispose();
            }
        }
    }
}
