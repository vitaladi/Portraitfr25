using Microsoft.EntityFrameworkCore;
using PortraitFrAward.Data;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;
using System.Linq;

var builder = WebApplication.CreateBuilder(args);

// 🔥 Récupération du port Railway ou défaut 5000
var port = Environment.GetEnvironmentVariable("PORT") ?? "5000";

// 🔥 Utilisation des variables d’environnement pour la connexion Supabase
var connectionString = Environment.GetEnvironmentVariable("DATABASE_URL") 
    ?? builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(connectionString));

// Activer les contrôleurs API
builder.Services.AddControllers();

// ✅ Configuration CORS pour autoriser Netlify en production et localhost en dev
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy => policy
            .WithOrigins(
                builder.Environment.IsDevelopment() ? "http://localhost:3000" : "https://testpfrawards25.netlify.app"
            )
            .AllowAnyMethod()
            .AllowAnyHeader()
    );
});

// ✅ Swagger pour documenter l’API
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "PortraitFr Award API", Version = "v1" });

    // Configuration pour gérer les fichiers uploadés
    c.OperationFilter<SwaggerFileOperationFilter>();
});

var app = builder.Build();

// ✅ Rediriger en HTTPS en production
if (!app.Environment.IsDevelopment())
{
    app.UseHttpsRedirection();
}

// ✅ Middleware CORS
app.UseCors("AllowFrontend");

app.UseStaticFiles(); // 🚀 Essentiel pour charger les fichiers de wwwroot/uploads

// ✅ Middleware d'autorisation
app.UseAuthorization();

// ✅ Mapper les contrôleurs
app.MapControllers();

// ✅ Activer Swagger en mode développement ET PRODUCTION sur Railway
app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "PortraitFr Award API v1");
    c.RoutePrefix = "swagger"; // Accès via /swagger
});

// ✅ Utilisation du port dynamique pour Railway
app.Urls.Add($"http://*:{port}");

app.Run();

// ✅ Classe pour gérer les fichiers uploadés dans Swagger
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
