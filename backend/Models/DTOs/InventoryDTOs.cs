namespace wevt2.Models.DTOs
{
    public class InventoryTransactionDto
    {
        public int ProductId { get; set; }
        public int QuantityChanged { get; set; }
        public string Type { get; set; } = "IN"; // o "OUT"
    }
}
