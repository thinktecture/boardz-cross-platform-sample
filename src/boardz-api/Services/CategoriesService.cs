using System;
using System.Collections.Generic;
using System.Linq;
using BoardZ.API.Database;
using BoardZ.API.Extensions;
using BoardZ.API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;

namespace BoardZ.API.Services
{
    public class CategoriesService : IDisposable
    {
        protected BoardZContext Context { get; }

        public CategoriesService(BoardZContext context)
        {
            Context = context;
        }

        public IList<Category> GetAll(string userName, byte[] rowVersion)
        {
            IQueryable<Category> query = Context.Categories
                .Include(category => category.GameCategories)
                .ThenInclude(gamesCategory => gamesCategory.Game)
                .Where(category => category.UserName.Equals(userName, StringComparison.InvariantCultureIgnoreCase))
                .OrderBy(category => category.Name);
            if (rowVersion != null)
            {
                query = query
                    .Where(category => category.RowVersion.Compare(rowVersion) > 0);
            }
            return query.ToList();

        }

        public IList<Category> GetAll(string username)
        {
            return Context.Categories
                .Include(category => category.GameCategories)
                .ThenInclude(gamesCategory => gamesCategory.Game)
                    .Where(c => c.UserName.Equals(username, StringComparison.InvariantCultureIgnoreCase))
                    .OrderBy(category => category.Name)
                    .ToList();
        }

        public int GetCount(string username)
        {
            return Context.Categories.Count(category =>
                category.UserName.Equals(username, StringComparison.InvariantCultureIgnoreCase));
        }

        public Guid AddCategory(Category category, string username)
        {
            category.Id = Guid.NewGuid();
            category.UserName = username;
            Context.Categories.Add(category);
            Context.SaveChanges();
            return category.Id;
        }

        public Category GetById(Guid id, string username)
        {
            return Context.Categories
                .Include(category => category.GameCategories)
                .ThenInclude(gamesCategory => gamesCategory.Game)
                .Where(category => category.UserName.Equals(username, StringComparison.InvariantCultureIgnoreCase))
                .FirstOrDefault(category => category.Id.Equals(id));
        }

        public bool DeleteCategory(Guid id)
        {
            var found = Context.Categories
                .Include(category => category.GameCategories)
                .FirstOrDefault(category => category.Id.Equals(id));
            if (found == null)
            {
                return false;
            }
            try
            {
                if (found.GameCategories.Any())
                {
                    return false;
                }
                Context.Entry(found).State = EntityState.Deleted;
                Context.SaveChanges();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public bool Update(Category category, string username)
        {
            try
            {
                category.UserName = username;
                Context.Categories.Attach(category);
                Context.Entry(category).State = EntityState.Modified;
                Context.SaveChanges();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public void Dispose()
        {
            Context?.Dispose();
        }

        public IDbContextTransaction NewTransaction()
        {
            return Context.Database.BeginTransaction();
        }
    }
}
