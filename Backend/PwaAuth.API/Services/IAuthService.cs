using PwaAuth.API.DTOs;

namespace PwaAuth.API.Services
{
    public interface IAuthService
    {
        Task<LoginResponse?> AuthenticateAsync(string email, string identityNumber);
        bool ValidateToken(string token);
    }
}