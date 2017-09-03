using System;
using System.Collections.Generic;
using System.Linq;
using Newtonsoft.Json;

namespace BoardZ.API.Models
{
    /// <summary>
    /// Category model
    /// </summary>
    public class Category
    {
        /// <summary>
        /// default ctor
        /// </summary>
        public Category()
        {
            GameCategories = new List<GameCategory>();
        }

        /// <summary>
        /// Category Id
        /// </summary>
        public Guid Id { get; set; }


        /// <summary>
        /// Name of the Category
        /// </summary>
        public String Name { get; set; }

        /// <summary>
        /// The name of the user who craeated that category
        /// </summary>
        [JsonIgnore]
        public string UserName { get; set; }

        /// <summary>
        /// All games in this category
        /// </summary>
        [JsonIgnore]
        public IEnumerable<GameCategory> GameCategories { get; set; }

        /// <summary>
        /// List with Games in that category
        /// </summary>
        public IList<String> GameNames
        {
            get
            {
                return this.GameCategories
                    .Where(gc => gc.Game.UserName.Equals(this.UserName, StringComparison.InvariantCultureIgnoreCase))
                    .Select(gc => gc.Game.Name)
                    .ToList();
            }
        }

        /// <summary>
        /// NumberOfGames
        /// </summary>
        public int NumberOfGames => this.GameNames.Count;

        /// <summary>
        /// Category Row Version
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

        [JsonIgnore]
        public int State { get; set; }

        [JsonIgnore]
        public ModelState ModelState => (ModelState)this.State;
    }
}
