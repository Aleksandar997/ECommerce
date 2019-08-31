namespace ECommerceAPI.Models.Paging
{
    public class BasePaging
    {
        public string SortBy { get; set; }
        public int SortOrder { get; set; }
        public int Skip { get; set; }
        public int Take { get; set; }
        public string Filter { get; set; }
    }
}
