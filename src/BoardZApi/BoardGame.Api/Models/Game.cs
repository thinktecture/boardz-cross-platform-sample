using System;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Linq;

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
        [JsonIgnore]
        public byte[] RowVersion { get; set; }
    
        /// <summary>
        /// the version that goes to the client
        /// </summary>
        public ulong RowVersionAsInt
        {
            get
            {
                if (RowVersion != null)
                {
                    return BitConverter.ToUInt64(RowVersion.Reverse().ToArray(), 0);
                }
                return 0;
            }
        }

        /// <summary>
        /// ModelState -> will be provided by the client when syncinc after connection was lost
        /// </summary>
        
        public int State { get; set; }

        [JsonIgnore]
        public ModelState ModelState => (ModelState)this.State;
    }
}
