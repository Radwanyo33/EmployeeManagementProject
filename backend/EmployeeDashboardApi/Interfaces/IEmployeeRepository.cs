using EmployeeDashboardApi.Models;
namespace EmployeeDashboardApi.Interfaces
{
    public interface IEmployeeRepository
    {
        Task<List<Employee>> GetEmployeesAsync(EmployeeFilter filter);
        Task<Employee?> GetEmployeeByIdAsync(int id);
        Task<Employee> CreateEmployeeAsync(Employee employee);
        Task<Employee?> UpdateEmployeeAsync(int id, Employee employee);
        Task<bool> ArchiveEmployeeAsync(int id);
        Task<bool> DeleteEmployeeAsync(int id);
    }
}
