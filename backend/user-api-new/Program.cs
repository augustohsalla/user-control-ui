using System.Text.Json.Serialization;
using EFCoreInMemoryDbDemo;
using user_api_new.Services;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers().AddJsonOptions(x =>
{
    x.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
    x.JsonSerializerOptions.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull;
}); ;
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddDbContext<ApiContext>();
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(
        builder =>
        {
            builder.WithOrigins("https://localhost:3000", "https://localhost:3001", "http://localhost:4200")
                                .AllowAnyHeader()
                                .AllowAnyMethod();
        });
});
builder.Services.AddScoped<IUserInterface, UserService>();

var app = builder.Build();
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

