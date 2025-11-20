using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace EmployeeDashboardApi.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Employees",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Department = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Role = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    JoiningDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PerformanceScore = table.Column<int>(type: "int", nullable: false),
                    IsArchived = table.Column<bool>(type: "bit", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Employees", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Employees",
                columns: new[] { "Id", "CreatedAt", "Department", "IsArchived", "JoiningDate", "Name", "PerformanceScore", "Role", "Status", "UpdatedAt" },
                values: new object[,]
                {
                    { 1, new DateTime(2023, 2, 7, 0, 0, 0, 0, DateTimeKind.Utc), "Engineering", false, new DateTime(2023, 2, 7, 0, 0, 0, 0, DateTimeKind.Utc), "Md. Radwanul Hoque Rafi", 93, "Software Engineer", "Active", new DateTime(2023, 2, 7, 0, 0, 0, 0, DateTimeKind.Utc) },
                    { 2, new DateTime(2021, 6, 1, 0, 0, 0, 0, DateTimeKind.Utc), "Finance", false, new DateTime(2021, 6, 1, 0, 0, 0, 0, DateTimeKind.Utc), "Anonnya Chowdhury", 90, "Finance Secretary", "Active", new DateTime(2021, 6, 1, 0, 0, 0, 0, DateTimeKind.Utc) }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Employees");
        }
    }
}
