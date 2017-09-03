using System;
using System.Collections.Generic;
using System.Linq;
using Newtonsoft.Json;

namespace BoardZ.API.Models
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
            GameCategories = new List<GameCategory>();
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
        [JsonProperty("categories")]
        public List<GameCategory> GameCategories { get; set; }

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

        internal static Game FromDTO(GameDTO transferObject, string userName)
        {
            var game = new Game
            {
                Id = Guid.NewGuid(),
                AgeRatingId = transferObject.AgeRatingId,
                UserName = userName,
                Description = transferObject.Description,
                Name = transferObject.Name
            };

            foreach (var item in transferObject.Categories)
            {
                game.GameCategories.Add(new GameCategory
                {
                    CategoryId = item.Id
                });
            }
            return game;
        }

        /// <summary>
        /// ModelState -> will be provided by the client when syncinc after connection was lost
        /// </summary>

        public int State { get; set; }

        [JsonIgnore]
        public ModelState ModelState => (ModelState)this.State;
    }
}
