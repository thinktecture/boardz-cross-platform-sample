using Newtonsoft.Json;
using System;

namespace BoardZ.API.Models
{
    public class GameCategory
    {
        public Guid GameId { get; set; }
        [JsonIgnore]
        public Game Game { get; set; }
        public Guid CategoryId { get; set; }
        [JsonIgnore]
        public Category Category { get; set; }
    }
}
