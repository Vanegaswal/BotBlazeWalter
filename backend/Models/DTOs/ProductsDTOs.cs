using System.ComponentModel.DataAnnotations;

namespace wevt2.Models.DTOs
{
    public class ProductsCreate
    {
        [Required(ErrorMessage = "El nombre del producto es obligatorio.")]
        public string Name { get; set; }

        [Range(0.01, double.MaxValue, ErrorMessage = "El precio debe ser mayor que 0.")]
        public decimal UnitPrice { get; set; }

        public string? Description { get; set; }

        [Range(0, int.MaxValue, ErrorMessage = "La cantidad inicial no puede ser negativa.")]
        public int? InitialQuantity { get; set; }

        [Range(0, int.MaxValue, ErrorMessage = "La cantidad disponible no puede ser negativa.")]
        public int? AvailableQuantity { get; set; }
    }

    public class Productsupdate
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal UnitPrice { get; set; }
    }

    public class ProducDelete
    {
        public int Id { get; set; }
    }
}
