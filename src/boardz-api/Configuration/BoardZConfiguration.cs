namespace BoardZ.API.Configuration
{
    public class BoardZConfiguration
    {
        public BoardZConfiguration()
        {
            IdSrvAudience = "api";
        }
        public string DbConnectionString { get; set; }
        public string IdSrvUrl { get; set; }
        public string IdSrvAudience { get; set; }
        public bool IsHttpsRequired { get; set; }
    }
}
