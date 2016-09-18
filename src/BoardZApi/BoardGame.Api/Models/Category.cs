using BoardGame.Api.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BoardGame.Api.Models
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
            this.Games = new HashSet<Game>();
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
        public virtual ICollection<Game> Games { get; set; }

        /// <summary>
        /// List with Games in that category
        /// </summary>
        public IList<String> GameNames
        {
            get
            {
                return this.Games.Where(game => game.UserName.Equals(this.UserName, StringComparison.InvariantCultureIgnoreCase)).Select(game => game.Name).ToList();
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
        public ModelState ModelState { get; set; }
    }
}
