using System.ComponentModel.DataAnnotations;

namespace wevt2.Models
{
    public class User
    {
        public int Id { get; set; }

        [Required, MaxLength(50)]
        public string Username { get; set; } // No es necesario 'required string'


        [Required, EmailAddress]
        public string Email { get; set; }

        [Required]
        public string PasswordHash { get; set; } // Almacena el hash de la contraseña

        // Dirección de correo electrónico

   

        // Eliminado 'Password' ya que no es seguro mantener la contraseña en texto plano
    }
}
