# Étape 1 : Construction de l'application
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copie du fichier projet et restauration des dépendances
COPY *.sln .
COPY Backend/*.csproj ./Backend/
RUN dotnet restore Backend/Backend.csproj

# Copie du reste du code et build en mode Release
COPY Backend/. ./Backend/
WORKDIR /app/Backend
RUN dotnet publish -c Release -o out

# Étape 2 : Création de l'image finale pour exécution
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /app/Backend/out ./

# Exposer le port 5000
ENV ASPNETCORE_URLS=http://+:5000
EXPOSE 5000

# Lancer l'application
ENTRYPOINT ["dotnet", "Backend.dll"]
