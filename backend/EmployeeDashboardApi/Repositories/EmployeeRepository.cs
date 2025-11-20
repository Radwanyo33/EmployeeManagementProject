using EmployeeDashboardApi.Models;
using EmployeeDashboardApi.Interfaces;
using EmployeeDashboardApi.Data;
using Microsoft.EntityFrameworkCore;

namespace EmployeeDashboardApi.Repositories
{
    public class EmployeeRepository : IEmployeeRepository
    {
        private readonly ApplicationDbContext _context;
        public EmployeeRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        // Implement repository methods here
        public async Task<List<Employee>> GetEmployeesAsync(EmployeeFilter filter)
        {
            var query = _context.Employees.AsQueryable();

            // Search Across Multiple fields
            if (!string.IsNullOrEmpty(filter.SearchTerm))
            {
                query = query.Where(e => 
                    e.Name.Contains(filter.SearchTerm)||
                    e.Department.Contains(filter.SearchTerm) ||
                    e.Role.Contains(filter.SearchTerm)||
                    e.Status.Contains(filter.SearchTerm)
                );
            }
            // Filter by Department
            if (!string.IsNullOrEmpty(filter.Department))
            {
                query = query.Where(e => e.Department == filter.Department);
            }

            // Filter by Status
            if (!string.IsNullOrEmpty(filter.Status))
            {
                query = query.Where(e => e.Status == filter.Status);
            }

            // Filter by Date Range
            if (filter.StartDate.HasValue)
            {
                query = query.Where(e => e.JoiningDate >= filter.StartDate.Value);
            }
            if (filter.EndDate.HasValue)
            {
                query = query.Where(e => e.JoiningDate <= filter.EndDate.Value);
            }

            //Apply Sorting
            if (!string.IsNullOrEmpty(filter.SortBy))
            {
                query = filter.SortBy.ToLower() switch
                {
                    "name" => filter.SortDescending ? query.OrderByDescending(e => e.Name) : query.OrderBy(e => e.Name),
                    "department" => filter.SortDescending ? query.OrderByDescending(e => e.Department) : query.OrderBy(e => e.Department),
                    "JoiningDate" => filter.SortDescending ? query.OrderByDescending(e => e.JoiningDate) : query.OrderBy(e => e.JoiningDate),
                    "status" => filter.SortDescending ? query.OrderByDescending(e => e.Status) : query.OrderBy(e => e.Status),
                    "role" => filter.SortDescending ? query.OrderByDescending(e => e.Role) : query.OrderBy(e => e.Role),
                    _ => query.OrderBy(e => e.Id)
                };
            }
            else
            {
                // Default sorting when no sort specified
                query = query.OrderBy(e => e.Id);
            }

            // Apply Pagination
            return await query
                .Skip((filter.Page - 1) * filter.PageSize)
                .Take(filter.PageSize)
                .ToListAsync();
        }
        //Search By id of Employees
        public async Task<Employee?> GetEmployeeByIdAsync(int id)
        {
            return await _context.Employees.FindAsync(id);
        }
        // Adding New employees
        public async Task<Employee> CreateEmployeeAsync(Employee employee)
        {
            _context.Employees.Add(employee);
            await _context.SaveChangesAsync();
            return employee;
        }
        // Updateing existing employees
        public async Task<Employee?> UpdateEmployeeAsync(int id, Employee employee)
        {
            var existingEmployee = await _context.Employees.FindAsync(id);
            if (existingEmployee == null) return null;

            existingEmployee.Name = employee.Name;
            existingEmployee.Department = employee.Department;
            existingEmployee.Role = employee.Role;
            existingEmployee.JoiningDate = employee.JoiningDate;
            existingEmployee.Status = employee.Status;
            existingEmployee.PerformanceScore = employee.PerformanceScore;
            existingEmployee.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            return existingEmployee;
        }

        // Employee Soft Deletion / Archived
        public async Task<bool> ArchiveEmployeeAsync(int id)
        {
            var employee = await _context.Employees.FindAsync(id);
            if (employee == null) return false;

            employee.IsArchived = true;
            employee.Status = "Archived";
            employee.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            return true;
        }

        // Permanent Deletion of Employee
        public async Task<bool> DeleteEmployeeAsync(int id)
        {
            var employee = await _context.Employees.FindAsync(id);
            if (employee == null) return false;

            _context.Employees.Remove(employee);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
