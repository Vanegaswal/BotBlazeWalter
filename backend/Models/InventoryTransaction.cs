using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace wevt2.Models
{
    public class InventoryTransaction
    {
        public int Id { get; set; }

        [Required]
        public int ProductId { get; set; } // Clave foránea de Product

        public Product Product { get; set; } = null!; // Relación con Product

        public int QuantityChanged { get; set; }

        [Required, MaxLength(20)]
        public string Type { get; set; } = string.Empty; // "IN" o "OUT"

        public DateTime Date { get; set; } = DateTime.Now;
    }
}

