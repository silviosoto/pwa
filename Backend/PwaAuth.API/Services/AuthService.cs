using PwaAuth.API.Data;
using PwaAuth.API.DTOs;
using PwaAuth.API.Models;
using Microsoft.EntityFrameworkCore;

namespace PwaAuth.API.Services
{
    public class AuthService : IAuthService
    {
        private readonly ApplicationDbContext _context;
        private readonly ITokenService _tokenService;

        public AuthService(ApplicationDbContext context, ITokenService tokenService)
        {
            _context = context;
            _tokenService = tokenService;
        }

        public async Task<LoginResponse?> AuthenticateAsync(string email, string identityNumber)
        {
            // Buscar usuario por email y número de identidad
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Email == email && u.IdentityNumber == identityNumber);

            if (user == null)
                return null;

            // Generar token
            var token = _tokenService.GenerateToken(user);

            // Mapear a DTO
            var userDto = new UserDTO
            {
                Id = user.Id,
                Email = user.Email,
                Name = user.Name,
                Role = user.Role
            };

            return new LoginResponse
            {
                Token = token,
                User = userDto
            };
        }

        public bool ValidateToken(string token)
        {
            return _tokenService.ValidateToken(token);
        }
    }
}