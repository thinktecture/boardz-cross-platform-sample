namespace BoardZ.API.Models
{
    /// <summary>
    /// Model State enum
    /// </summary>
    public enum ModelState
    {
        /// <summary>
        /// No Changes
        /// </summary>
        
        Clean = 0,
        /// <summary>
        /// New Entity
        /// </summary>
        New = 1,
        /// <summary>
        /// Modified Entity
        /// </summary>
        Modified = 2,
        /// <summary>
        /// Entity has been deleted on the client
        /// </summary>
        Deleted = 3
    }

}
