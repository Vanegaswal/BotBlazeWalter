using Microsoft.AspNetCore.Mvc;
using wevt2.Models;
using wevt2.Data;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using System.Security.Cryptography;
using System;
using wevt2.Data.wevt2.Data;

namespace wevt2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public UsersController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(User user)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            // Validar si el usuario o el email ya existen
            if (_context.Users.Any(u => u.Username == user.Username || u.Email == user.Email))
                return Conflict("El nombre de usuario o email ya están registrados.");

            // Generar hash de la contraseña
            user.PasswordHash = HashPassword(user.PasswordHash);

            // Guardar usuario
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Usuario registrado con éxito" });
        }

        private string HashPassword(string password)
        {
            byte[] salt = RandomNumberGenerator.GetBytes(128 / 8); // 128-bit salt

            string hashed = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                password: password,
                salt: salt,
                prf: KeyDerivationPrf.HMACSHA256,
                iterationCount: 100000,
                numBytesRequested: 256 / 8));

            return hashed;
        }
    }
}
