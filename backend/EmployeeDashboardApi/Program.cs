using Microsoft.EntityFrameworkCore;
using EmployeeDashboardApi.Data;
using EmployeeDashboardApi.Interfaces;
using EmployeeDashboardApi.Repositories;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddSwaggerGen();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddOpenApi();

//Add Entity Framework Core In-Memory Database
builder.Services.AddDbContext<ApplicationDbContext>(options =>
        options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Register repositories
builder.Services.AddScoped<IEmployeeRepository, EmployeeRepository>();

// Add Cors
builder.Services.AddCors(options => 
{
    options.AddPolicy("ReactApp", policy => 
    {
        policy.WithOrigins("http://localhost:3000")
        .AllowAnyHeader()
        .AllowAnyMethod();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.MapOpenApi();
}

app.UseCors("ReactApp");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

//Initialize Database
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    db.Database.EnsureCreated();
}

app.Run();
