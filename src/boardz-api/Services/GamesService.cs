using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using BoardZ.API.Database;
using BoardZ.API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;

namespace BoardZ.API.Services
{
    public class GamesService : IDisposable
    {
        protected BoardZContext Context { get; }

        public GamesService(BoardZContext context)
        {
            Context = context;
        }

        public void Dispose()
        {
            Context?.Dispose();
        }

        public IList<Game> GetAll(string username, ulong? rowVersion = null)
        {
            IQueryable<Game> query = Context.Games
                .Include(game => game.AgeRating)
                .Include(game => game.GameCategories)
                .ThenInclude(gameCategory => gameCategory.Category)
                .Where(game => game.UserName.Equals(username, StringComparison.InvariantCultureIgnoreCase));

            if (rowVersion.HasValue)
            {
                query = query
                    .Where(game => game.RowVersionAsInt > rowVersion);
            }
            return query.ToList();
        }

        public int GetCount(string username)
        {
            return Context.Games
                .Count(game => game.UserName.Equals(username, StringComparison.InvariantCultureIgnoreCase));
        }

        public Guid AddGame(Game game)
        { 
            Context.Games.Add(game);
            foreach (var item in game.GameCategories)
            {
                Context.Entry<Category>(item.Category).State = EntityState.Unchanged;
            }
            if (game.AgeRating != null)
            {
                Context.Entry<AgeRating>(game.AgeRating).State = EntityState.Unchanged;
            }
            Context.SaveChanges();
            return game.Id;
        }

        public Game GetById(Guid id, string username)
        {
            return Context.Games
                .Include(game => game.AgeRating)
                .Include(game => game.GameCategories)
                .ThenInclude(gameCategory => gameCategory.Category)
                .FirstOrDefault(game =>
                    game.UserName.Equals(username, StringComparison.InvariantCultureIgnoreCase) && game.Id.Equals(id));
        }

        public bool DeleteGame(Guid id)
        {
            var found = Context.Games
                .FirstOrDefault(game => game.Id.Equals(id));

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

        public bool Update(Game game, string username)
        {
            try
            {
                var foundGame = GetById(game.Id, username);
                if (foundGame == null)
                {
                    return false;
                }
                Context.Entry(foundGame).CurrentValues.SetValues(game);
                foundGame.GameCategories.Clear();
                foreach (var category in game.GameCategories)
                {
                    var foundCategory = Context.Categories.Find(category.CategoryId);
                    foundGame.GameCategories.Add(new GameCategory
                    {
                        Category = foundCategory,
                        CategoryId = foundCategory.Id,
                        Game = foundGame,
                        GameId = foundGame.Id
                    });
                }
                Context.SaveChanges();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public IDbContextTransaction NewTransaction()
        {
            return Context.Database.BeginTransaction();
        }
    }
}
