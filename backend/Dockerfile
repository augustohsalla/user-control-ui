#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 8080
EXPOSE 443
ENV ASPNETCORE_URLS http://*:5000:


FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["./backend/user-web-api.csproj", "."]
RUN dotnet restore "./user-web-api.csproj"
COPY . .
WORKDIR "/src/."
RUN dotnet build "user-web-api.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "user-web-api.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
EXPOSE 8080
ENTRYPOINT ["dotnet", "user-web-api.dll"]
