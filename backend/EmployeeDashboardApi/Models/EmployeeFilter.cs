namespace EmployeeDashboardApi.Models
{
    public class EmployeeFilter
    {
        public string? SearchTerm { get; set; }
        public string? Department { get; set; }
        public string? Status { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string? SortBy { get; set; }
        public bool SortDescending { get; set; }
        public int Page { get; set; } = 1;
        public int PageSize { get; set; } = 10;
    }
}
