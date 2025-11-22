using Microsoft.AspNetCore.Mvc;
using EmployeeDashboardApi.Models;
using EmployeeDashboardApi.Interfaces;
namespace EmployeeDashboardApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private readonly IEmployeeRepository _repository;

        public EmployeesController(IEmployeeRepository repository)
        {
            _repository = repository;
        }

        //Search and Filter Employees

        [HttpGet]
        public async Task<ActionResult<List<Employee>>> GetEmployees([FromQuery] EmployeeFilter filter)
        {
            try
            {
                var employees = await _repository.GetEmployeesAsync(filter);
                return Ok(employees);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // Search employees through assigned id
        [HttpGet("{id}")]
        public async Task<ActionResult<Employee>> GetEmployee(int id)
        {
            var employee = await _repository.GetEmployeeByIdAsync(id);
            if (employee == null) return NotFound();
            return Ok(employee);
        }

        // Create new employee
        [HttpPost]
        public async Task<ActionResult<Employee>> CreateEmployee(EmployeeDto employeeDto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            //Validating Joining Date is not in the future
            if (employeeDto.JoiningDate > DateTime.Today)
            {
                ModelState.AddModelError("JoiningDate", "Joining Date cannot be in the future.");
                return BadRequest(ModelState);
            }

            var employee = new Employee
            {
                Name = employeeDto.Name,
                Department = employeeDto.Department,
                Role = employeeDto.Role,
                JoiningDate = employeeDto.JoiningDate,
                Status = employeeDto.Status,
                PerformanceScore = employeeDto.PerformanceScore
            };

            var createdEmployee = await _repository.CreateEmployeeAsync(employee);
            return CreatedAtAction(nameof(GetEmployee), new { id = createdEmployee.Id }, createdEmployee);
        }

        // Update existing employee
        [HttpPut("{id}")]
        public async Task<ActionResult<Employee>> UpdateEmployee(int id, EmployeeDto employeeDto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            //Validating Joining Date is not in the future
            if (employeeDto.JoiningDate > DateTime.Today)
            {
                ModelState.AddModelError("JoiningDate", "Joining Date cannot be in future");
                return BadRequest(ModelState);
            }

            var employee = new Employee
            {
                Name = employeeDto.Name,
                Department = employeeDto.Department,
                Role = employeeDto.Role,
                JoiningDate = employeeDto.JoiningDate,
                Status = employeeDto.Status,
                PerformanceScore = employeeDto.PerformanceScore
            };

            var updatedEmployee = await _repository.UpdateEmployeeAsync(id, employee);
            if (updatedEmployee == null) return NotFound();
            return Ok(updatedEmployee);
        }
        // Soft Deletion of Employee
        [HttpPatch("{id}/archive")]
        public async Task<ActionResult> ArchiveEmployee(int id)
        {
            var result = await _repository.ArchiveEmployeeAsync(id);
            if (!result) return NotFound();
            return NoContent();
        }
        // Permanent Deletion of Employees
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteEmployee(int id)
        {
            var result = await _repository.DeleteEmployeeAsync(id);
            if (!result) return NotFound();
            return NoContent();
        }
    }
}
