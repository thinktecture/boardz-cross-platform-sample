using System;

namespace BoardGame.Api.Models
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
        /// Optional coordinate of the player
        /// </summary>
        public Coordinate Coordinate { get; set; }

        /// <summary>
        /// Current game the player is playing
        /// </summary>
        public Guid BoardGameId { get; set; }

        /// <summary>
        /// Base64 Image Url (if player did "i am gaming")
        /// </summary>
        public string ImageUrl { get; set; }
    }
}