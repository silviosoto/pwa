namespace PwaAuth.API.Models
{
    public class LoginRequest
    {
        public string Email { get; set; } = string.Empty;
        public string IdentityNumber { get; set; } = string.Empty;
    }
}