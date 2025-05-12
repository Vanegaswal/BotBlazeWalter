using System.Threading.Tasks;

using wevt2.Models;

public interface IUserService
{
    Task<(bool Success, string Message, string Token)> RegisterUserAsync(User user, string password);
}
