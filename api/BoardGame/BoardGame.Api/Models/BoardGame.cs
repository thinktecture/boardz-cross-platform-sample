using System;

namespace BoardGame.Api.Models
{
    public class BoardGame
    {
        public Guid Id { get; set; }
        public string Name { get; set; } 
        public string Description { get; set; }
    }
}