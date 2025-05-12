using Microsoft.EntityFrameworkCore;
using wevt2.Models;

namespace wevt2.Data
{
    using Microsoft.EntityFrameworkCore;

    namespace wevt2.Data
    {
        public class ApplicationDbContext : DbContext
        {
            public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

            public DbSet<Product> Products { get; set; }
            public DbSet<InventoryTransaction> InventoryTransactions { get; set; }
            protected override void OnModelCreating(ModelBuilder modelBuilder)
            {
                base.OnModelCreating(modelBuilder);

                modelBuilder.Entity<InventoryTransaction>()
                    .HasOne(i => i.Product)
                    .WithMany() // Si un producto puede estar asociado con múltiples transacciones
                    .HasForeignKey(i => i.ProductId);
            }

            public DbSet<User> Users { get; set; }
        }
    }

}
