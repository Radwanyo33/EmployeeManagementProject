import { useCallback, useState, useEffect } from "react";
import { Employee, EmployeeDto,EmployeeFilter } from "../types/employee";
import{employeeService} from "../services/employeeService";
import { message } from "antd";

export const useEmployees = () => {
    const [employees,setEmployees] = useState<Employee[]>([]);
    const [loading,setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const loadEmployees = useCallback(async(filter : EmployeeFilter) => {
        setLoading(true);
        setError(null);
        try{
            const data = await employeeService.getEmployees(filter);
            setEmployees(data);
        } catch(err){
            setError('Failed to Load Employees');
            message.error('Failed to Load Employees');
        }finally{
            setLoading(false);
        }
    },[]);

    const createEmployee = async(employee: EmployeeDto) : Promise<boolean> => {
        try{
            await employeeService.createEmployee(employee);
            message.success('Employee created successfully');
            return true;
        }catch(err){
            message.error('Failed to create Employees');
            return false;
        }
    };
    const updateEmployee = async(id: number, employee: EmployeeDto) : Promise<boolean> => {
        try{
            await employeeService.updateEmployee(id, employee);
            message.success('Employee updated successfully');
            return true;
        }catch(err){
            message.error('Failed to update employee');
            return false;
        }
    };
    const archiveEmployee = async(id: number) : Promise<boolean> => {
        try{
            await employeeService.archiveEmployee(id);
            message.success('Employee archived successfully');
            return true;
        }catch(err){
            message.error('Employee archive failed');
            return false;
        }
    };
    const deleteEmployee = async(id: number) : Promise<boolean> => {
        try{
            await employeeService.deleteEmployee(id);
            message.success('Employee deleted successfully');
            return true;
        }catch(err){
            message.error('Employee cannot be deleted');
            return false;
        }
    };

    return{
        employees,
        loading,
        error,
        loadEmployees,
        createEmployee,
        updateEmployee,
        archiveEmployee,
        deleteEmployee,
    };
};