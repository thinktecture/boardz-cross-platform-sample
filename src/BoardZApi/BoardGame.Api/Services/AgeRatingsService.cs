using BoardGame.Api.Models;
using System;
using System.Collections.Generic;

namespace BoardGame.Api.Services
{
    internal class AgeRatingsService : IDisposable
    {
        private readonly BoardzContext _dbContext;

        public AgeRatingsService()
        {
            _dbContext = new BoardzContext();
        }


        public IEnumerable<AgeRating> GetAll(string userName)
        {
            return _dbContext.AgeRatings;
        }

        public void Dispose()
        {
            if (_dbContext != null)
            {
                _dbContext.Dispose();
            }
        }
    }
}
