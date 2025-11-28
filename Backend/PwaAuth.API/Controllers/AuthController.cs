using Microsoft.AspNetCore.Mvc;
using PwaAuth.API.Models;
using PwaAuth.API.Services;

namespace PwaAuth.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly ILogger<AuthController> _logger;

        public AuthController(IAuthService authService, ILogger<AuthController> logger)
        {
            _authService = authService;
            _logger = logger;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            try
            {
                _logger.LogInformation($"Intento de login para: {request.Email}");

                if (string.IsNullOrEmpty(request.Email) || string.IsNullOrEmpty(request.IdentityNumber))
                {
                    return BadRequest(new { message = "Email y número de identidad son requeridos" });
                }

                var result = await _authService.AuthenticateAsync(request.Email, request.IdentityNumber);
                
                if (result == null)
                {
                    _logger.LogWarning($"Login fallido para: {request.Email}");
                    return Unauthorized(new { message = "Credenciales inválidas" });
                }

                _logger.LogInformation($"Login exitoso para: {request.Email}");
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error durante login para: {request.Email}");
                return StatusCode(500, new { message = "Error interno del servidor" });
            }
        }

        [HttpPost("validate")]
        public IActionResult ValidateToken([FromBody] ValidateTokenRequest request)
        {
            try
            {
                if (string.IsNullOrEmpty(request.Token))
                {
                    return BadRequest(new { message = "Token es requerido" });
                }

                var isValid = _authService.ValidateToken(request.Token);
                return Ok(new { isValid });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error validando token");
                return StatusCode(500, new { message = "Error validando token" });
            }
        }

        [HttpGet("users")]
        public IActionResult GetUsers()
        {
            // Solo para testing - en producción proteger este endpoint
            return Ok(new { message = "API funcionando correctamente" });
        }
    }
}