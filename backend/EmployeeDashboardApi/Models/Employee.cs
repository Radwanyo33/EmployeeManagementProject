using System.ComponentModel.DataAnnotations;

namespace EmployeeDashboardApi.Models
{
    public class Employee
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; } = string.Empty;

        [Required]
        public string Department { get; set; } = string.Empty;

        [Required]
        public string Role { get; set; } = string.Empty;

        [DataType(DataType.Date)]
        public DateTime JoiningDate { get; set; }

        public string Status { get; set; } = "Active";
        public int PerformanceScore { get; set; } = 0;
        public bool IsArchived { get; set; } = false;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}
