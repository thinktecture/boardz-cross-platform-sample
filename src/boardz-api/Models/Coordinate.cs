using System;

namespace BoardZ.API.Models
{
    /// <summary>
    /// Coordinate DataType
    /// </summary>
    public class Coordinate
    {
        /// <summary>
        /// PK
        /// </summary>
        public Guid Id { get; set; }
        /// <summary>
        /// Latitude value
        /// </summary>
        public double Latitude { get; set; }

        /// <summary>
        /// Longitude value
        /// </summary>
        public double Longitude { get; set; }
    }
}