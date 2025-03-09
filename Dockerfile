# Étape 1 : Utiliser .NET 8.0 SDK pour le build
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build-env
WORKDIR /app

# Copier uniquement le fichier projet pour optimiser le cache
COPY . ./

# Copier tout le reste et compiler en mode Release
RUN dotnet publish -c Release -o out

# Étape 2 : Image d'exécution (runtime)
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build-env /app/out .


# Configurer le bon port pour Railway
ENV ASPNETCORE_URLS=http://+:5000
EXPOSE 5000

# Lancer l'application
ENTRYPOINT ["dotnet", "Backend.dll"]