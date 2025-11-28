using PwaAuth.API.Models;

namespace PwaAuth.API.Services
{
    public interface ITokenService
    {
        string GenerateToken(User user);
        bool ValidateToken(string token);
    }
}