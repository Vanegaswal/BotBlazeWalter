using Microsoft.AspNetCore.Mvc;
using wevt2.Models;
using wevt2.Data;
using wevt2.Data.wevt2.Data;
using wevt2.Models.Dtos;
using Microsoft.EntityFrameworkCore;

namespace wevt2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InventoryController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public InventoryController(ApplicationDbContext context)
        {
            _context = context;
        }

        // POST: api/Inventory
        // GET: api/inventory/product/5
        [HttpGet("product/{productId}")]
        public async Task<IActionResult> GetByProduct(int productId)
        {
            var transactions = await _context.InventoryTransactions
                .Where(t => t.ProductId == productId)
                .Include(t => t.Product)
                .OrderByDescending(t => t.Date)
                .ToListAsync();

            return Ok(transactions);
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var transactions = await _context.InventoryTransactions
                .Include(t => t.Product)
                .OrderByDescending(t => t.Date)
                .ToListAsync();

            return Ok(transactions);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] InventoryTransactionDto dto)
        {
            // Validar el modelo recibido
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            // Buscar el producto por ProductId
            var product = await _context.Products.FindAsync(dto.ProductId);
            if (product == null)
                return NotFound($"Producto con ID {dto.ProductId} no encontrado.");

            // Validar que haya suficiente inventario si el tipo es "OUT"
            if (dto.Type == "OUT" && product.AvailableQuantity < dto.QuantityChanged)
            {
                return BadRequest("No hay suficiente inventario para realizar esta transacción.");
            }

            // Iniciar una transacción para asegurar que todo el proceso sea atómico
            using (var transaction = await _context.Database.BeginTransactionAsync())
            {
                try
                {
                    // Mapear el DTO a la entidad InventoryTransaction
                    var transactionEntity = new InventoryTransaction
                    {
                        Product = product,               // Relacionamos el producto afectado
                        QuantityChanged = dto.QuantityChanged, // La cantidad que cambia
                        Type = dto.Type,                 // Tipo de transacción ("IN" o "OUT")
                        Date = DateTime.UtcNow           // Fecha de la transacción (usar UTC)
                    };

                    // Modificar la cantidad disponible del producto según el tipo de transacción
                    if (dto.Type == "IN")
                    {
                        product.AvailableQuantity += dto.QuantityChanged;  // Aumentar cantidad
                    }
                    else if (dto.Type == "OUT")
                    {
                        product.AvailableQuantity -= dto.QuantityChanged;  // Disminuir cantidad
                    }

                    // Agregar la transacción de inventario
                    _context.InventoryTransactions.Add(transactionEntity);

                    // Actualizar el producto en la base de datos
                    _context.Products.Update(product);

                    // Guardar los cambios en la base de datos de manera atómica
                    await _context.SaveChangesAsync();

                    // Confirmar la transacción
                    await transaction.CommitAsync();

                    // Retornar la transacción de inventario creada
                    return CreatedAtAction(nameof(Create), new { id = transactionEntity.Id }, transactionEntity);
                }
                catch (Exception ex)
                {
                    // Si algo falla, revertir la transacción
                    await transaction.RollbackAsync();
                    return StatusCode(500, $"Error al procesar la transacción: {ex.Message}");
                }
            }
        }
    }
}



