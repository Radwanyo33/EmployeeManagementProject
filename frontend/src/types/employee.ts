export interface Employee {
    id: number;
    name: string;
    department: string;
    role: string;
    joiningDate: string;
    status: 'Active' | 'Archived';
    performanceScore: number;
    isArchived: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface EmployeeDto{
    name: string;
    department: string;
    role: string;
    joiningDate: string;
    status: 'Active' | 'Archived';
    performanceScore: number;
}

export interface EmployeeFilter {
    searchTerm?: string;
    department?: string;
    status?: string;
    startDate?: string;
    endDate?: string;
    sortBy?: string;
    sortDescending?: boolean;
    page: number;
    pageSize: number;
}