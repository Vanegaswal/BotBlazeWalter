using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace wevt2.Models
{
    public class Product
    {
        public int Id { get; set; }

        [Required, MaxLength(100)]
        public  string? Name { get; set; }

        [MaxLength(500)]
        public string? Description { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal? UnitPrice { get; set; }

        public int? InitialQuantity { get; set; }

        public int? AvailableQuantity { get; set; }
    }
}


