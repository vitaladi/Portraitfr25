# Étape 1 : Construction de l'application
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copie uniquement les fichiers de projet pour optimiser la mise en cache
COPY Backend/*.csproj Backend/

# Définition du répertoire de travail pour la restauration des dépendances
WORKDIR /app/Backend
RUN dotnet restore

# Copie du reste du code source
COPY Backend/. .

# Compilation et publication en mode Release
RUN dotnet publish -c Release -o /app/out

# Étape 2 : Création de l'image finale pour exécution
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /app/out ./

# Définir le bon port pour Railway
ENV ASPNETCORE_URLS=http://+:5000
EXPOSE 5000

# Lancer l'application
ENTRYPOINT ["dotnet", "Backend.dll"]
