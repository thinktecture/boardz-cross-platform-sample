namespace BoardZ.API.Models
{
    /// <summary>
    /// Model used to transfer nearby players
    /// </summary>
    public class PlayerWithDistance
    {
        /// <summary>
        /// The Player instance
        /// </summary>
        public Player Player { get; set; }

        /// <summary>
        /// Distance in KM
        /// </summary>
        public double Distance { get; set; }
    }
}
