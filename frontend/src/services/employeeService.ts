import axios from 'axios';
import {Employee, EmployeeDto, EmployeeFilter} from '../types/employee';

const API_BASE_URL = 'https://localhost:7121';

const api = axios.create({
    baseURL : API_BASE_URL,
});

export const employeeService = {
    async getEmployees(filter: EmployeeFilter): Promise<Employee[]>{
        const params = new URLSearchParams();

        Object.entries(filter).forEach(([key,value]) => {
            if(value !== undefined && value !== null && value!== ''){
                params.append(key, value.toString());
            }
        });

        const response = await api.get(`/api/Employees?${params}`);

        return response.data;
    },
    async getEmployee(id: number): Promise<Employee>{
        const response = await api.get(`/api/Employees/${id}`);

        return response.data;
    },
    async createEmployee(employee: EmployeeDto) : Promise<Employee>{
        const response = await api.post('/api/Employees',employee);
        return response.data;
    },
    async updateEmployee(id: number,employee: EmployeeDto) : Promise<Employee>{
        const response = await api.put(`/api/Employees/${id}`,employee);
        return response.data;
    },
    async archiveEmployee(id: number) : Promise<void>{
        const response = await api.patch(`/api/Employees/${id}/archive`);
        //return response.data;
    },
    async deleteEmployee(id: number) : Promise<void>{
        const response = await api.delete(`/api/Employees/${id}`);
        //return response.data;
    }
};