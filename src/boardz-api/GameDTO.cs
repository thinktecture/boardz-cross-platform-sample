using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BoardZ.API.Models;

namespace BoardZ.API
{
    public class GameDTO
    {
        public String Name { get; set; }
        public String Description { get; set; }
        public Guid? AgeRatingId { get; set; }
        public List<Category> Categories { get; set; }
        public ulong RowVerionAsInt { get; set; }
        public String UserName { get; set; }
        public Guid Id { get; internal set; }

        internal static GameDTO FromGame(Game game)
        {
            return new GameDTO
            {
                Id = game.Id,
                UserName = game.UserName,
                AgeRatingId = game.AgeRatingId,
                Categories = game.GameCategories.Select(gc => gc.Category).ToList(),
                Name = game.Name,
                Description = game.Description,
                RowVerionAsInt = game.RowVersionAsInt
            };
        }
    }
}
