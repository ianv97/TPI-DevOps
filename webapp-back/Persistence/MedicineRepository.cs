using GestionDeMedicamentos.Models;
using GestionDeMedicamentos.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using System.Linq;
using System.Threading.Tasks;

namespace GestionDeMedicamentos.Persistence
{
    public interface IMedicineRepository
    {
        Task<PaginatedList<Medicine>> ListAsync(string name, string drug, string proportion, string presentation, string laboratory, string stock, string order, int? pageNumber, int? pageSize);
        Task<Medicine> FindAsync(int id);
        EntityState Update(Medicine medicine);
        Task<EntityEntry> CreateAsync(Medicine medicine);
        EntityEntry Delete(Medicine medicine);
        Task SaveChangesAsync();
        bool MedicineExists(int id);
    }


    public class MedicineRepository : BaseRepository, IMedicineRepository
    {
        public MedicineRepository(PostgreContext context) : base(context)
        {
        }

        public async Task<PaginatedList<Medicine>> ListAsync(string name, string drug, string proportion, string presentation, string laboratory, string stock, string order, int? pageNumber, int? pageSize)
        {
            var medicines = _context.Medicines.Include(m => m.Drug).Where(m => (name == null || m.Name.ToLower().StartsWith(name.ToLower())) && (drug == null || m.Drug.Name.ToLower().StartsWith(drug.ToLower())) && (proportion == null || m.Proportion.ToString().StartsWith(proportion)) && (presentation == null || m.Presentation.ToString().ToLower().StartsWith(presentation.ToLower())) && (laboratory == null || m.Laboratory.ToLower().StartsWith(laboratory.ToLower())) && (stock == null || m.Stock.ToString().StartsWith(stock)));

            bool descending = false;
            if (order != null)
            {
                order = order.Substring(0, 1).ToUpper() + order.Substring(1, order.Length - 1);
                if (order.EndsWith("_desc"))
                {
                    order = order.Substring(0, order.Length - 5);
                    descending = true;
                }

                if (descending)
                {
                    medicines = medicines.OrderByDescending(e => EF.Property<object>(e, order));
                }
                else
                {
                    medicines = medicines.OrderBy(e => EF.Property<object>(e, order));
                }
            }

            return await PaginatedList<Medicine>.CreateAsync(medicines, pageNumber ?? 1, pageSize ?? 0);
        }

        public async Task<Medicine> FindAsync(int id)
        {
            return await _context.Medicines.Include(m => m.Drug).FirstOrDefaultAsync(m => m.Id == id);
        }

        public EntityState Update(Medicine medicine)
        {
            return _context.Entry(medicine).State = EntityState.Modified;
        }

        public async Task<EntityEntry> CreateAsync(Medicine medicine)
        {
            return await _context.Medicines.AddAsync(medicine);
        }

        public EntityEntry Delete(Medicine medicine)
        {
            return _context.Medicines.Remove(medicine);
        }

        public bool MedicineExists(int id)
        {
            return _context.Medicines.Any(e => e.Id == id);
        }
    }
}
