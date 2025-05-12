namespace wevt2.Models.Dtos
{
    public class InventoryTransactionDto
    {
        public int ProductId { get; set; }
        public int QuantityChanged { get; set; }
        public string Type { get; set; } = string.Empty;
    }
}