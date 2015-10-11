using System;
using Newtonsoft.Json;

namespace BoardGame.Api.Models
{
    public class BoardGame
    {
        /// <summary>
        /// Unique identifier
        /// </summary>
        public Guid Id { get; set; }

        /// <summary>
        /// Name of the board game
        /// </summary>
        public string Name { get; set; } 

        /// <summary>
        /// Additional description
        /// </summary>
        public string Description { get; set; }

        /// <summary>
        /// Packshot URLs
        /// </summary>
        public Packshot Packshot { get; set; }

        [JsonIgnore]
        public string UserName { get; set; }
    }
}