using System;
using System.Collections.Generic;
using System.Linq;
using BoardZ.API.Database;
using BoardZ.API.Models;

namespace BoardZ.API.Services
{
    public class AgeRatingsService : IDisposable
    {
        public AgeRatingsService(BoardZContext context)
        {
            Context = context;
        }

        protected BoardZContext Context { get; }

        public IEnumerable<AgeRating> GetAll(string username)
        {
            return Context.AgeRatings
                .OrderBy(a => a.Name);
        }

        public void Dispose()
        {
            Context?.Dispose();
        }
    }
}
