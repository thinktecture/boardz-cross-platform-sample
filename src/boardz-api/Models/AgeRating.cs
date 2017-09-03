using System;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace BoardZ.API.Models
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
        [JsonIgnore]
        public virtual ICollection<Game> Games { get; set; }
        
    }
}
