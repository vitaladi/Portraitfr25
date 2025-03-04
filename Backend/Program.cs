using Microsoft.EntityFrameworkCore;
using PortraitFrAward.Data;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;
using System.Linq;

var builder = WebApplication.CreateBuilder(args);

// Ajouter la connexion à Supabase
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// Activer les contrôleurs API
builder.Services.AddControllers();

// Configurer CORS pour permettre au frontend React d'accéder au backend
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy => policy.WithOrigins("http://localhost:3000") // Remplacez par l'URL de votre frontend
                        .AllowAnyMethod()
                        .AllowAnyHeader());
});

// Ajouter Swagger pour documenter l'API
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "PortraitFr Award API", Version = "v1" });

    // Configuration pour gérer les fichiers uploadés
    c.OperationFilter<SwaggerFileOperationFilter>();

});

var app = builder.Build();

// Middleware CORS
app.UseCors("AllowFrontend");

app.UseStaticFiles(); // 🚀 Cette ligne est essentielle pour charger les fichiers de wwwroot

// Middleware d'autorisation
app.UseAuthorization();

// Mapper les contrôleurs
app.MapControllers();

// Activer Swagger UI en développement
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.Run();

// Classe pour gérer les fichiers uploadés dans Swagger
public class SwaggerFileOperationFilter : IOperationFilter
{
    public void Apply(OpenApiOperation operation, OperationFilterContext context)
    {
        var fileParams = context.ApiDescription.ActionDescriptor.Parameters
            .Where(p => p.ParameterType == typeof(IFormFile))
            .ToList();

        if (fileParams.Any())
        {
            operation.RequestBody = new OpenApiRequestBody
            {
                Content =
                {
                    ["multipart/form-data"] = new OpenApiMediaType
                    {
                        Schema = new OpenApiSchema
                        {
                            Type = "object",
                            Properties = fileParams.ToDictionary(
                                p => p.Name,
                                p => new OpenApiSchema
                                {
                                    Type = "string",
                                    Format = "binary"
                                }
                            )
                        }
                    }
                }
            };
        }
    }
}