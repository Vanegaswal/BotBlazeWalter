using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
// Ajusta el namespace según tu estructura
using wevt2.Data.wevt2.Data;
using wevt2.Models;

public class UserService : IUserService
{
    private readonly ApplicationDbContext _context;
    private readonly TokenService _tokenService;
    private readonly IPasswordHasher<User> _passwordHasher;

    public UserService(ApplicationDbContext context, TokenService tokenService, IPasswordHasher<User> passwordHasher)
    {
        _context = context;
        _tokenService = tokenService;
        _passwordHasher = passwordHasher;
    }

    public async Task<(bool Success, string Message, string Token)> RegisterUserAsync(User user, string password)
    {
        // Verifica si el usuario ya existe
        var existingUser = await _context.Users
            .AsNoTracking()
            .FirstOrDefaultAsync(u => u.Email == user.Email);

        if (existingUser != null)
        {
            return (false, "El usuario ya existe con este correo electrónico.", null);
        }

        // Hashea la contraseña
        user.PasswordHash = _passwordHasher.HashPassword(user, password);

        // Guarda el nuevo usuario
        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        // Genera el token JWT
        var token = _tokenService.GenerateToken(user);

        return (true, "Usuario registrado exitosamente.", token);
    }
}
