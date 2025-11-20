namespace EmployeeDashboardApi.Models
{
    public class EmployeeDto
    {
        public string Name { get; set; } = string.Empty;
        public string Department { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty;
        public DateTime JoiningDate { get; set; }
        public string Status { get; set; } = "Active";
        public int PerformanceScore { get; set; } = 0;
    }
}
