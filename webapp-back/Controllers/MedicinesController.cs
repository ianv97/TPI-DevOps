using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GestionDeMedicamentos.Models;
using GestionDeMedicamentos.Persistence;
using GestionDeMedicamentos.Services;

namespace GestionDeMedicamentos.Controllers
{
    public class MedicinesController : ControllerBase
    {
        private readonly IMedicineRepository _medicineRepository;

        public MedicinesController(IMedicineRepository medicineRepository)
        {
            _medicineRepository = medicineRepository;
        }

        // GET: api/medicamentos?name=Ibupirac&drug=Ibuprofeno&order=name
        [HttpGet]
        public async Task<IActionResult> GetMedicines(string name, string drug, string proportion, string presentation, string laboratory, string stock, string order, int? pageNumber, int? pageSize)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            PaginatedList<Medicine> medicines = await _medicineRepository.ListAsync(name, drug, proportion, presentation, laboratory, stock, order, pageNumber, pageSize);
            HttpContext.Response.Headers.Add("page", medicines.PageIndex.ToString());
            HttpContext.Response.Headers.Add("totalRecords", medicines.TotalRecords.ToString());
            return Ok(medicines);
        }

        // GET: api/medicamentos/5
        [HttpGet]
        public async Task<IActionResult> GetMedicine([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var medicine = await _medicineRepository.FindAsync(id);

            if (medicine == null)
            {
                return NotFound();
            }

            return Ok(medicine);
        }

        // PUT: api/medicamentos/5
        [HttpPut]
        public async Task<IActionResult> PutMedicine([FromRoute] int id, [FromBody] Medicine medicine)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != medicine.Id)
            {
                return BadRequest();
            }

            _medicineRepository.Update(medicine);

            try
            {
                await _medicineRepository.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_medicineRepository.MedicineExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(medicine);
        }

        // POST: api/medicamentos
        [HttpPost]
        public async Task<IActionResult> PostMedicine([FromBody] Medicine medicine)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await _medicineRepository.CreateAsync(medicine);
            await _medicineRepository.SaveChangesAsync();

            return CreatedAtAction("GetMedicine", new { id = medicine.Id }, medicine);
        }

        // DELETE: api/medicamentos/5
        [HttpDelete]
        public async Task<IActionResult> DeleteMedicine([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var medicine = await _medicineRepository.FindAsync(id);
            if (medicine == null)
            {
                return NotFound();
            }

            _medicineRepository.Delete(medicine);
            await _medicineRepository.SaveChangesAsync();

            return Ok(medicine);
        }


    }
}