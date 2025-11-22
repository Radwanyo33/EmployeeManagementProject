using Microsoft.EntityFrameworkCore;
using EmployeeDashboardApi.Models;
namespace EmployeeDashboardApi.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }
        public DbSet<Employee> Employees { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Employee>().HasData(
                new Employee
                {
                    Id = 1,
                    Name = "Md. Radwanul Hoque Rafi",
                    Department = "Engineering",
                    Role = "Software Engineer",
                    JoiningDate = new DateTime(2023, 2, 07, 0, 0, 0, DateTimeKind.Utc),
                    Status = "Active",
                    PerformanceScore = 93,
                    IsArchived = false,
                    CreatedAt = new DateTime(2023, 2, 07, 0, 0, 0, DateTimeKind.Utc),
                    UpdatedAt = new DateTime(2023, 2, 07, 0, 0, 0, DateTimeKind.Utc)
                },
                new Employee
                {
                    Id = 2,
                    Name = "Anonnya Chowdhury",
                    Department = "Finance",
                    Role = "Finance Secretary",
                    JoiningDate = new DateTime(2021, 6, 1,0,0,0,DateTimeKind.Utc),
                    Status = "Active",
                    PerformanceScore = 90,
                    IsArchived = false,
                    CreatedAt = new DateTime(2021, 6, 1, 0, 0, 0, DateTimeKind.Utc),
                    UpdatedAt = new DateTime(2021, 6, 1, 0, 0, 0, DateTimeKind.Utc)
                }
            );
        }
    }
}
