using BoardGame.Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Data.Entity;

namespace BoardGame.Api.Services
{
    internal class CategoriesService : IDisposable
    {
        private readonly BoardzContext _dbContext;

        /// <summary>
        /// /
        /// </summary>
        public CategoriesService()
        {
            _dbContext = new BoardzContext();
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

        /// <summary>
        /// Return all Categories from a given user
        /// </summary>
        /// <param name="userName"></param>
        /// <returns></returns>
        public IEnumerable<Category> GetAll(String userName)
        {
            return _dbContext.Categories.Include(category=>category.Games)
                .Where(category => category.UserName.Equals(userName, StringComparison.InvariantCultureIgnoreCase)).OrderBy(category => category.Name);
        }

        /// <summary>
        /// Get a category by it's id
        /// </summary>
        /// <param name="categoryId"></param>
        /// <param name="userName"></param>
        /// <returns></returns>
        public Category GetById(Guid categoryId, String userName)
        {
            return _dbContext.Categories
                .Include(category => category.Games.Where(game=>game.UserName.Equals(userName,StringComparison.InvariantCultureIgnoreCase)))
                .Where(category => category.UserName.Equals(userName, StringComparison.InvariantCultureIgnoreCase))
                .FirstOrDefault(category => category.Id.Equals(categoryId));
        }

        /// <summary>
        /// Get Category Count
        /// </summary>
        /// <param name="username"></param>
        /// <returns></returns>
        internal int Count(string username)
        {
            return this.GetAll(username).Count();
        }

        /// <summary>
        /// Update a category
        /// </summary>
        /// <param name="category"></param>
        /// <param name="userName"></param>
        /// <returns></returns>
        public bool Update(Category category, String userName)
        {
            try
            {
                category.UserName = userName;
                _dbContext.Categories.Attach(category);
                _dbContext.Entry(category).State = EntityState.Modified;
                _dbContext.SaveChanges();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        
        /// <summary>
        /// Delete a category by it's id
        /// </summary>
        /// <param name="categoryId"></param>
        /// <returns></returns>
        public bool DeleteCategory(Guid categoryId)
        {

            var found = _dbContext.Categories.Include(category => category.Games).FirstOrDefault(category => category.Id.Equals(categoryId));
            if (found == null)
            {
                return false;
            }
            try
            {
                if (found.Games.Any())
                {
                    return false;
                }
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
        /// Create a new Category
        /// </summary>
        /// <param name="category"></param>
        /// <param name="userName"></param>
        /// <returns></returns>
        public Guid AddCategory(Category category, string userName)
        {
            category.Id = Guid.NewGuid();
            category.UserName = userName;
            _dbContext.Categories.Add(category);
            _dbContext.SaveChanges();
            return category.Id;
        }
    }
}
