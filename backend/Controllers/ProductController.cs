using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using wevt2.Data;
using wevt2.Data.wevt2.Data;
using wevt2.Models;
using wevt2.Models.DTOs;

namespace wevt2.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ProductController(ApplicationDbContext context)
        {
            _context = context;
        }

        // 1. Crear un nuevo producto (POST)
        [HttpPost]
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] ProductsCreate product)
        {
            // Validar el modelo
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState); // Devolver un BadRequest con los errores de validación
            }

            // Crear una nueva instancia de Product a partir del modelo ProductsCreate
            var newProduct = new Product
            {
                Name = product.Name,
                UnitPrice = product.UnitPrice,
                Description = product.Description,
                InitialQuantity = product.InitialQuantity ?? 0,  // Aseguramos que no sea null
                AvailableQuantity = product.AvailableQuantity ?? 0  // Aseguramos que no sea null
            };

            // Agregar el nuevo producto al contexto
            _context.Products.Add(newProduct);
            await _context.SaveChangesAsync();

            // Retornar la respuesta de creación con el nuevo producto
            return CreatedAtAction(nameof(GetById), new { id = newProduct.Id }, newProduct);
        }
        // 2. Obtener todos los productos con filtros opcionales (GET)
        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] string? search, [FromQuery] decimal? minPrice, [FromQuery] decimal? maxPrice)
        {
            var products = _context.Products.AsQueryable();

            if (!string.IsNullOrEmpty(search))
                products = products.Where(p => p.Name.Contains(search));

            if (minPrice.HasValue)
                products = products.Where(p => p.UnitPrice >= minPrice);

            if (maxPrice.HasValue)
                products = products.Where(p => p.UnitPrice <= maxPrice);

            return Ok(await products.ToListAsync());
        }

        // 3. Obtener un producto por ID (GET)
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null)
                return NotFound();

            return Ok(product);
        }

        // 4. Editar producto (PUT)
        [HttpPut("productedit/{id}")]
        public async Task<IActionResult> Edit(int id, [FromBody] Productsupdate product)
        {
            // Verificar si el ID de la URL coincide con el ID del producto recibido
            if (id != product.Id)
            {
                return BadRequest("ID del producto no coincide.");
            }

            // Verificar si el modelo es válido
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Buscar el producto en la base de datos por su ID
            var existingProduct = await _context.Products.FindAsync(id);

            // Si el producto no existe, retornar NotFound
            if (existingProduct == null)
            {
                return NotFound("Producto no encontrado.");
            }

            // Actualizar los valores del producto encontrado con los datos del producto recibido
            _context.Entry(existingProduct).CurrentValues.SetValues(product);

            try
            {
                // Guardar los cambios en la base de datos
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                // Si ocurre una excepción de concurrencia, verificar si el producto aún existe
                if (!_context.Products.Any(p => p.Id == id))
                {
                    return NotFound("Producto no encontrado.");
                }

                // En caso de otra excepción, lanzarla para manejo futuro
                
                throw;
            }
            catch (Exception ex)
            {
                // Capturar cualquier otro tipo de excepción y logear el error
              
                return StatusCode(500, "Hubo un problema al actualizar el producto.");
            }

            // Retornar una respuesta sin contenido si la actualización fue exitosa
            return NoContent();
        }


        // 5. Eliminar producto (DELETE)
        [HttpDelete("productdelete/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            // Buscar el producto por su ID
            var product = await _context.Products.FindAsync(id);

            // Si el producto no existe, retornar NotFound
            if (product == null)
            {
                return NotFound("Producto no encontrado.");
            }

            try
            {
                // Eliminar el producto encontrado
                _context.Products.Remove(product);

                // Guardar los cambios en la base de datos
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                // Capturar cualquier otro tipo de excepción y logear el error
              
                return StatusCode(500, "Hubo un problema al eliminar el producto.");
            }

            // Retornar una respuesta sin contenido si la eliminación fue exitosa
            return NoContent();
        }

    }
}
