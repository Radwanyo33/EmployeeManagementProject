# Employee Management Dashboard 🚀

A full-stack Employee Management System built with **.NET Core Web API** backend and **React TypeScript** frontend with Ant Design.

![Employee Dashboard](https://img.shields.io/badge/Full--Stack-Employee%20Dashboard-blue)
![.NET](https://img.shields.io/badge/.NET-9.0-purple)
![React](https://img.shields.io/badge/React-18.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)

## 📋 Project Overview

A modern, responsive employee management dashboard that provides comprehensive CRUD operations, advanced filtering, and real-time search capabilities for managing employee records.

## ✨ Features

### Backend (.NET Core Web API)
- ✅ **RESTful API** with proper HTTP methods
- ✅ **Entity Framework Core** with SQL Server
- ✅ **Repository Pattern** for data access
- ✅ **Advanced Filtering & Search** across multiple fields
- ✅ **Soft Delete** functionality with archive system
- ✅ **Pagination** for optimized data loading
- ✅ **Input Validation** with data annotations
- ✅ **Swagger/OpenAPI** documentation

### Frontend (React + TypeScript + Ant Design)
- ✅ **Full CRUD Operations** for employee management
- ✅ **Responsive Design** with table and card views
- ✅ **Advanced Search** with debouncing (500ms)
- ✅ **Multi-filter System** (Department, Status, Date Range)
- ✅ **Sorting** on all columns with state persistence
- ✅ **Soft Delete** with archive/restore functionality
- ✅ **Form Validation** with Ant Design rules
- ✅ **Toast Notifications** for user feedback
- ✅ **Performance Score** with progress bars
- ✅ **Empty States** and loading indicators

## 🏗️ Project Structure
```markdown
EmployeeManagementProject/
├── backend/
│ └── EmployeeDashboardApi/
│ ├── Controllers/ # API Controllers
│ ├── Models/ # Data Models & DTOs
│ ├── Data/ # DbContext & Database
│ ├── Repositories/ # Data Access Layer
│ ├── Migrations/ # Entity Framework Migrations
│ ├── Program.cs # Application entry point
│ └── appsettings.json # Configuration
├── frontend/
│ ├── src/
│ │ ├── components/ # React Components
│ │ ├── hooks/ # Custom React Hooks
│ │ ├── services/ # API Service Layer
│ │ ├── types/ # TypeScript Interfaces
│ │ └── App.tsx # Main App Component
│ ├── public/ # Static Assets
│ └── package.json # Dependencies
└── README.md
```

## Quick Start

### Prerequisites
- **.NET 9.0 SDK**
- **Node.js 18+** and npm
- **SQL Server** (LocalDB or Express)

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend/EmployeeDashboardApi

2. **Restore dependencies:**
    dotnet restore

3. **Update Database**
    dotnet ef database update

4. **Run the application:**
    dotnet run

    API will be available at: https://localhost:7121
    Swagger documentation: https://localhost:7121/swagger

### Frontend Setup
1. **Navigate to Frontend Directory:**
    cd frontend

2. **Install Dependencies:**
    npm install

3. **Start Development Server:**
    npm start
    Application will open at: http://localhost:3000

### 🎯 API Endpoints:

 Method	    Endpoint	                Description
- GET	    /api/Employees	            Get all employees (with filtering)
- GET	    /api/Employees/{id}	        Get employee by ID
- POST	    /api/Employees	            Create new employee
- PUT	    /api/Employees/{id}	        Update employee
- DELETE	/api/Employees/{id}	        Delete employee permanently
- PATCH	    /api/Employees/{id}/archive	Archive/restore employee

**Query Parameters for GET /api/Employees:**
- searchTerm - Search across name, department, role, status

- department - Filter by department

- status - Filter by status (Active/Archived)

- startDate / endDate - Filter by joining date range

- sortBy - Sort field (name, department, joiningDate, etc.)

- sortDescending - Sort direction

- page - Page number (default: 1)

- pageSize - Items per page (default: 10)

### 🎨 Frontend Features

**Employee Dashboard**

- Table View: Traditional data table with sorting

- Card View: Visual card layout for better UX

- Global Search: Real-time search across all fields

- Advanced Filters: Combine department, status, and date filters

- Pagination: Built-in pagination with page size options

**Employee Form**

- Drawer-based: Slide-in form for better UX

- Validation: Required fields and business rules

- Save & Continue: Option to save and keep form open

- Pre-filled Data: Auto-populate for edit operations

**Employee Actions**

- Edit: Update employee details

- Archive: Soft delete with archive status

- Delete: Permanent removal

- Status Toggle: Switch between Active/Archived views

### 🔧 Technology Stack

**Backend**

- .NET 9.0 - Runtime

- ASP.NET Core Web API - Web Framework

- Entity Framework Core - ORM

- SQL Server - Database

- Swashbuckle - API Documentation

**Frontend**

- React 18 - UI Library

- TypeScript - Type Safety

- Ant Design - UI Components

- Axios - HTTP Client

- Day.js - Date Manipulation

### 📊 Data Model

**Employee Entity**
```markdown
```csharp
public class Employee
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Department { get; set; }
    public string Role { get; set; }
    public DateTime JoiningDate { get; set; }
    public string Status { get; set; } // Active/Archived
    public int PerformanceScore { get; set; } // 1-100
    public bool IsArchived { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}
```
###  🛠️ Development

**Adding New Features**

1. Backend: Add new endpoints in EmployeesController

2. Frontend: Update services and components

3. Test API with Swagger

4. Update TypeScript interfaces if needed

**Database Migrations**

# Create new migration
dotnet ef migrations add MigrationName

# Update database
dotnet ef database update

### 🤝 Contributing

1. Fork the repository

2. Create a feature branch (git checkout -b feature/amazing-feature)

3. Commit your changes (git commit -m 'Add amazing feature')

4. Push to the branch (git push origin feature/amazing-feature)

5. Open a Pull Request

### 📝 License
This project is licensed under the MIT License - see the LICENSE file for details.

### 👥 Authors

**Md. Radwanul Hoque Rafi** - Initial work

### 🙏 Acknowledgments

- Ant Design for the beautiful UI components

- .NET Team for the robust backend framework

- React Team for the excellent frontend library

**⭐ Star this repo if you found it helpful!**