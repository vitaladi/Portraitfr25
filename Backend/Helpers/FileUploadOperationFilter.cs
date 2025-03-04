using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;

public class FileUploadOperationFilter : IOperationFilter
{
    public void Apply(OpenApiOperation operation, OperationFilterContext context)
    {
        if (operation.OperationId == "Inscription")
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
                            Properties =
                            {
                                ["photo"] = new OpenApiSchema { Type = "string", Format = "binary" },
                                ["nom"] = new OpenApiSchema { Type = "string" },
                                ["instagram"] = new OpenApiSchema { Type = "string" },
                                ["email"] = new OpenApiSchema { Type = "string", Format = "email" },
                                ["categorie"] = new OpenApiSchema { Type = "string" },
                                ["description"] = new OpenApiSchema { Type = "string" }
                            }
                        }
                    }
                }
            };
        }
    }
}
