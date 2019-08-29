namespace ECommerceAPI.Models
{
    public class UploadFileInfo
    {
        public string CurrentName { get; set; }
        public string PastName { get; set; }

        public UploadFileInfo(string _CurrentName, string _PastName)
        {
            CurrentName = _CurrentName;
            PastName = _PastName;
        }
    }
}
