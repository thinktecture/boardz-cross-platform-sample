using System;
using BoardZ.API.Controllers;
using Newtonsoft.Json;

namespace BoardZ.API.Models
{
    public class Player
    {
        /// <summary>
        /// Unique identifier
        /// </summary>
        public Guid Id { get; set; } 

        /// <summary>
        /// Name of the player
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// FK
        /// </summary>
        public Guid CoordinateId { get; set; }
        /// <summary>
        /// Optional coordinate of the player
        /// </summary>
        public Coordinate Coordinate { get; set; }

        /// <summary>
        /// Current game the player is playing
        /// </summary>
        public Guid GameId { get; set; }

        /// <summary>
        /// Current Game instance
        /// </summary>
        [JsonIgnore()]
        public virtual Game Game { get; set; }

        /// <summary>
        /// Base64 Image Url (if player did "i am gaming")
        /// </summary>
        public string ImageUrl { get; set; }


        /// <summary>
        /// Since when is the player playing that game
        /// </summary>
        public DateTime PlayingSince { get; set; }
        /// <summary>
        /// Will only be set when using <see cref="PlayersController.FindNearby"/> API
        /// </summary>
        public string BoardGameName
        {
            get
            {

                return this.Game!=null?this.Game.Name:String.Empty;
            }
        }
    }
}
