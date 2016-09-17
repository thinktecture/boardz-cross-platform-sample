using BoardGame.Api.EntityFrameworkExtensions;
using BoardGame.Api.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;

namespace BoardGame.Api.Services
{
    /// <summary>
    /// Game Service
    /// </summary>
    public class GameService : IDisposable
    {
        private readonly BoardzContext _dbContext;

        /// <summary>
        /// Default CTOR
        /// </summary>
        public GameService()
        {
            _dbContext = new BoardzContext();
        }

        /// <summary>
        /// Returns all games for a given user
        /// </summary>
        /// <param name="userName"></param>
        /// <param name="rowVersion"></param>
        /// <returns></returns>
        public IEnumerable<Game> GetAll(string userName, byte[] rowVersion = null)
        {
            if (rowVersion != null)
            {
                return _dbContext.Games
                    .Include(game => game.AgeRating)
                    .Include(game => game.Categories)
                    .Where(c => c.RowVersion.Compare(rowVersion) > 0).ToList();
            }
            return _dbContext.Games
                    .Include(game => game.AgeRating)
                    .Include(game => game.Categories)
                    .Where(game => game.UserName.Equals(userName, StringComparison.InvariantCultureIgnoreCase)).ToList();
        }

        /// <summary>
        /// Get a game by it's ID
        /// </summary>
        /// <param name="gameId"></param>
        /// <param name="userName"></param>
        /// <returns></returns>
        public Game GetById(Guid gameId, String userName)
        {
            return _dbContext.Games
                    .Include(game => game.AgeRating)
                    .Include(game => game.Categories)
                    .FirstOrDefault(game => game.UserName.Equals(userName, StringComparison.InvariantCultureIgnoreCase) && game.Id.Equals(gameId));
        }

        /// <summary>
        /// Get Games Count
        /// </summary>
        /// <param name="username"></param>
        /// <returns></returns>
        internal int Count(string username)
        {
            return this.GetAll(username, null).Count();
        }

        /// <summary>
        /// Update an existing game
        /// </summary>
        /// <param name="game"></param>
        /// <param name="userName"></param>
        /// <returns></returns>
        public bool Update(Game game, String userName)
        {
            try
            {
                game.UserName = userName;
                var dbEntity = this.GetById(game.Id, userName);
                if (dbEntity == null)
                {
                    return false;
                }
                _dbContext.Entry(dbEntity).CurrentValues.SetValues(game);
                dbEntity.Categories.Clear();
                foreach (var category in game.Categories)
                {
                    var dbCategory = _dbContext.Categories.Find(category.Id);
                    dbEntity.Categories.Add(dbCategory);
                }
                _dbContext.SaveChanges();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        /// <summary>
        /// Delete a game by it's Id
        /// </summary>
        /// <param name="gameId"></param>
        /// <returns></returns>
        public bool DeleteGame(Guid gameId)
        {
            var found = _dbContext.Games.FirstOrDefault(game => game.Id.Equals(gameId));
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
        /// Add a game
        /// </summary>
        /// <param name="game"></param>
        /// <param name="userName"></param>
        /// <returns></returns>
        public Guid AddGame(Game game, String userName)
        {
            game.Id = Guid.NewGuid();
            game.UserName = userName;
            _dbContext.Games.Add(game);
            _dbContext.SaveChanges();
            return game.Id;
        }

        /// <summary>
        /// IDisposable
        /// </summary>
        public void Dispose()
        {
            if (_dbContext != null)
            {
                _dbContext.Dispose();
            }
        }
    }
}
