using System;

namespace BoardGame.Api.Models
{
    public class Player
    {
        public Guid Id { get; set; } 
        public string Name { get; set; }
        public Coordinate Coordinate { get; set; }
        public Guid BoardGameId { get; set; }
    }
}