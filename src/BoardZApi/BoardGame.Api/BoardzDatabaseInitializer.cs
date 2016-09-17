using BoardGame.Api.Models;
using System;
using System.Data.Entity;

namespace BoardGame.Api
{
    internal class BoardzDatabaseInitializer : CreateDatabaseIfNotExists<BoardzContext>
    {
        /// <summary>
        /// Seed BoardZ Database with some static data
        /// </summary>
        /// <param name="context"></param>
        protected override void Seed(BoardzContext context)
        {
            context.AgeRatings.Add(new AgeRating { Name = "1 to 3 years", ColorIndicator = "green", Id = Guid.NewGuid() } );
            context.AgeRatings.Add(new AgeRating { Name = "4 to 8 years", ColorIndicator = "blue", Id = Guid.NewGuid() });
            context.AgeRatings.Add(new AgeRating { Name = "8 to 12 years", ColorIndicator = "yellow", Id = Guid.NewGuid() });
            context.AgeRatings.Add(new AgeRating { Name = "12 to 16 years", ColorIndicator = "orange", Id = Guid.NewGuid() });
            context.AgeRatings.Add(new AgeRating { Name = "16+", ColorIndicator = "red", Id = Guid.NewGuid() });
            base.Seed(context);
        }
    }
}
