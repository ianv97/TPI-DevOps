using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GestionDeMedicamentos.Models;
using GestionDeMedicamentos.Persistence;
using GestionDeMedicamentos.Services;

namespace GestionDeMedicamentos.Controllers
{
    [Route("api/drogas")]
    [ApiController]
    public class DrugsController : ControllerBase
    {
        private readonly IDrugRepository _drugRepository;

        public DrugsController(IDrugRepository drugRepository)
        {
            _drugRepository = drugRepository;
        }


        // GET: api/drogas?name=Ibuprofeno
        [HttpGet]
        public async Task<IActionResult> GetDrugs(string name, string order, int? pageNumber, int? pageSize)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            PaginatedList<Drug> drugs = await _drugRepository.ListAsync(name, order, pageNumber, pageSize);
            HttpContext.Response.Headers.Add("page", drugs.PageIndex.ToString());
            HttpContext.Response.Headers.Add("totalRecords", drugs.TotalRecords.ToString());
            return Ok(drugs);
        }

        // GET: api/drogas/5
        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetDrug([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var drug = await _drugRepository.FindAsync(id);

            if (drug == null)
            {
                return NotFound();
            }

            return Ok(drug);
        }

        // PUT: api/drogas/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDrug([FromRoute] int id, [FromBody] Drug drug)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != drug.Id)
            {
                return BadRequest();
            }

            _drugRepository.Update(drug);

            try
            {
                await _drugRepository.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_drugRepository.DrugExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/drogas
        [HttpPost]
        public async Task<IActionResult> PostDrug([FromBody] Drug drug)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await _drugRepository.CreateAsync(drug);
            await _drugRepository.SaveChangesAsync();

            return CreatedAtAction("GetDrug", new { id = drug.Id }, drug);
        }

        // DELETE: api/drogas/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDrug([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var drug = await _drugRepository.FindAsync(id);
            if (drug == null)
            {
                return NotFound();
            }

            _drugRepository.Delete(drug);
            await _drugRepository.SaveChangesAsync();

            return Ok(drug);
        }


    }
}