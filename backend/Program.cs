using System.Reflection.Metadata;
using System.Text.Json.Serialization;
using EFCoreInMemoryDbDemo;
using Microsoft.EntityFrameworkCore;
using userWebApi;
using userWebApi.Services;

var builder = WebApplication.CreateBuilder(args);
{
    var services = builder.Services;
    var env = builder.Environment;

    services.AddDbContext<ApiContext>();
    services.AddCors(options =>
    {
        options.AddDefaultPolicy(
            builder =>
            {
                builder.WithOrigins("https://localhost:3000", "https://localhost:3001", "http://localhost:4200")
                                    .AllowAnyHeader()
                                    .AllowAnyMethod();
            });
    });
    services.AddControllers().AddJsonOptions(x =>
    {
        x.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
        x.JsonSerializerOptions.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull;
    });
    services.AddScoped<IUserService, UserService>();
}

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c => {
    c.ResolveConflictingActions(apiDescriptions => apiDescriptions.First());
    c.IgnoreObsoleteActions();
    c.IgnoreObsoleteProperties();
    c.EnableAnnotations();
    c.CustomSchemaIds(type => type.FullName);
});

var app = builder.Build();
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseHttpsRedirection();
app.UseCors(builder =>
{
    builder
    .AllowAnyOrigin()
    .AllowAnyMethod()
    .AllowAnyHeader();
});
app.UseAuthorization();
app.MapControllers();
app.Run();

