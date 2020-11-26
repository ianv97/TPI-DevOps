using System.Threading.Tasks;

namespace GestionDeMedicamentos.Persistence
{
    public abstract class BaseRepository
    {
        protected readonly PostgreContext _context;

        public BaseRepository(PostgreContext context)
        {
            _context = context;
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}
