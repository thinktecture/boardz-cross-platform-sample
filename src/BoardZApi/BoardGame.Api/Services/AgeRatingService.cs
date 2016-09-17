using BoardGame.Api.Models;
using System;
using System.Collections.Generic;

namespace BoardGame.Api.Services
{
    internal class AgeRatingService : IDisposable
    {
        private readonly BoardzContext _dbContext;

        public AgeRatingService()
        {
            _dbContext = new BoardzContext();
        }


        public IEnumerable<AgeRating> GetAll()
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
