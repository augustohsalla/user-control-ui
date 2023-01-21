#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ["backend/user-api-new/user-api-new.csproj", "."]
RUN dotnet restore "./user-api-new.csproj"
COPY . .
WORKDIR "/src/."
RUN dotnet build "user-api-new.csproj" -c Development -o /app/build

FROM build AS publish
RUN dotnet publish "user-api-new.csproj" -c Development -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "user-api-new.dll"]
