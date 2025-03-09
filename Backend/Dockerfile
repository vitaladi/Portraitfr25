# Étape 1 : Utiliser .NET 8.0 (correctif principal)
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copier uniquement le fichier projet pour optimiser le cache
COPY Backend/*.csproj Backend/

# Définir le bon dossier avant la restauration
WORKDIR /app/Backend
RUN dotnet restore

# Copier tout le reste et compiler en mode Release
COPY Backend/. .
RUN dotnet publish -c Release -o /app/out

# Étape 2 : Image d'exécution (runtime)
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /app/out ./

# Configurer le bon port pour Railway
ENV ASPNETCORE_URLS=http://+:5000
EXPOSE 5000

# Lancer l'application
ENTRYPOINT ["dotnet", "Backend.dll"]
