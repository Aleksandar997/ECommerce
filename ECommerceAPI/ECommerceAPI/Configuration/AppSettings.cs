namespace ECommerceAPI.Configuration
{
    public class AppSettings
    {
        public string Config { get; set; }
        public Security Security { get; set; }
        private static AppSettings instance { get; set; }
        public Database Database { get; set; }
        public static AppSettings Instance
        {
            get
            {
                if (instance == null)
                    instance = new AppSettings();
                return instance;
            }
        }
    }
    public class Security
    {
        public string SecurityKey { get; set; }
        public string Issuer { get; set; }
        public string Audience { get; set; }
    }
    public class Database
    {
        public string ConnectionString { get; set; }
    }
}
