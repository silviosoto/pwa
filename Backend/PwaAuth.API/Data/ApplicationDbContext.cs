using PwaAuth.API.Models;
using Microsoft.EntityFrameworkCore;

namespace PwaAuth.API.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configurar índices únicos
            modelBuilder.Entity<User>()
                .HasIndex(u => u.Email)
                .IsUnique();

            modelBuilder.Entity<User>()
                .HasIndex(u => u.IdentityNumber)
                .IsUnique();

            // Seed data inicial
            modelBuilder.Entity<User>().HasData(
                new User
                {
                    Id = 1,
                    Email = "admin@example.com",
                    IdentityNumber = "123456789",
                    Name = "Administrador",
                    Role = "admin",
                    PasswordHash = "hashed_password_here" // En producción usar BCrypt
                },
                new User
                {
                    Id = 2,
                    Email = "manager@example.com",
                    IdentityNumber = "987654321",
                    Name = "Gerente",
                    Role = "manager",
                    PasswordHash = "hashed_password_here"
                },
                new User
                {
                    Id = 3,
                    Email = "user@example.com",
                    IdentityNumber = "456123789",
                    Name = "Usuario Regular",
                    Role = "user",
                    PasswordHash = "hashed_password_here"
                }
            );
        }
    }
}