using System;
using BoardGame.Api.Models;

namespace BoardGame.Api.Helpers
{
    /// <summary>
    /// Distance Calculator Logic
    /// </summary>
    public class DistanceCalculator
    {
        /// <summary>
        /// Adapted from http://www.geodatasource.com/developers/c-sharp
        /// </summary>
        /// <param name="origin"></param>
        /// <param name="destination"></param>
        /// <returns></returns>
        public double CalculateDistance(Coordinate origin, Coordinate destination)
        {
            var theta = origin.Longitude - destination.Longitude;
            var distance = Math.Sin(Deg2Rad(origin.Latitude)) *
                  Math.Sin(Deg2Rad(destination.Latitude)) +
                  Math.Cos(Deg2Rad(origin.Latitude)) *
                  Math.Cos(Deg2Rad(destination.Latitude)) *
                  Math.Cos(Deg2Rad(theta));

            distance = Math.Acos(distance);
            distance = Rad2Deg(distance);
            distance = distance * 60 * 1.1515;

            // Kilometers
            return distance * 1.609344;
        }

        internal static double Deg2Rad(double deg)
        {
            return (deg * Math.PI / 180.0);
        }

        internal static double Rad2Deg(double rad)
        {
            return (rad / Math.PI * 180.0);
        }
    }
}