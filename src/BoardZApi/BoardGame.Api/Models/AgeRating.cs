using System;
using System.Collections.Generic;

namespace BoardGame.Api.Models
{

    /// <summary>
    /// AgeRating Model
    /// </summary>
    public class AgeRating
    {
        /// <summary>
        /// AgeRating Id
        /// </summary>
        public Guid Id { get; set; }

        /// <summary>
        /// Name of the AgeRating
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// Color indicator for the age rating
        /// </summary>
        public string ColorIndicator{ get; set; }

        /// <summary>
        /// Games applied to this age rating
        /// </summary>
        public virtual ICollection<Game> Games { get; set; }
    }
}
