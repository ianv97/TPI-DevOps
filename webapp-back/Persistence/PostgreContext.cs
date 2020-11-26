using GestionDeMedicamentos.Models;
using Microsoft.EntityFrameworkCore;

namespace GestionDeMedicamentos.Persistence
{
    public class PostgreContext : DbContext
    {
        public DbSet<Drug> Drugs { get; set; }
        public DbSet<Medicine> Medicines { get; set; }

        public PostgreContext(DbContextOptions<PostgreContext> options) : base(options)
        {

        }

    }
}
