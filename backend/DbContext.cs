using System;
using System.Reflection.Metadata;
using EFCoreInMemoryDbDemo;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;

namespace EFCoreInMemoryDbDemo
{
    public class ApiContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        
        protected override void OnConfiguring
       (DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseInMemoryDatabase(databaseName: "UserDb");
        }


protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>(entity => { entity.Property(e => e.Username).IsRequired(); entity.Property(e => e.Email).IsRequired(); });
            modelBuilder.Entity<User>().HasData(
                new User { Id = -1, Name = "Sample User", Username = "userdef0-1", Email = "defuser-1@gmail.com", Userwebsite = "https://www.userwebsitef0-1.com" },
                new User { Id = -2, Name = "Other user", Username = "userdef0-2", Email = "defuser-2@gmail.com", Userwebsite = "https://www.userwebsitef0-2.com" },
                new User { Id = -3, Name = "Another user", Username = "userdef0-3", Email = "defuser-3@gmail.com", Userwebsite = "https://www.userwebsitef0-3.com" });

        }
    }
}