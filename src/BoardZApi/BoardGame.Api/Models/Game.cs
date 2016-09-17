using System;
using Newtonsoft.Json;
using System.Collections.Generic;

namespace BoardGame.Api.Models
{
    /// <summary>
    /// The Game Model
    /// </summary>
    public class Game
    {
        /// <summary>
        /// default ctor
        /// </summary>
        public Game()
        {
    
        }
        /// <summary>
        /// Unique identifier
        /// </summary>
        public Guid Id { get; set; }

        /// <summary>
        /// Name of the board game
        /// </summary>
        public string Name { get; set; } 

        /// <summary>
        /// Edition of the Game
        /// </summary>
        public string Edition { get; set; }

        /// <summary>
        /// List of categories applied to the game
        /// </summary>
        public virtual ICollection<Category> Categories { get; set; }

        /// <summary>
        /// AgeRatingId
        /// </summary>
        public Guid? AgeRatingId { get; set; }

        /// <summary>
        /// Age Rating
        /// </summary>
        public virtual AgeRating AgeRating { get; set; }
        /// <summary>
        /// Additional description
        /// </summary>
        public string Description { get; set; }

        /// <summary>
        /// Name of the user who created the game
        /// </summary>
        [JsonIgnore]
        public string UserName { get; set; }

        /// <summary>
        /// RowVersion -> required for Offline Support
        /// </summary>
        public byte[] RowVersion { get; set; }
    }
}