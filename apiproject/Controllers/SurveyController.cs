using apiproject.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace apiproject.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SurveyController : Controller
    {
        private readonly AppDbContext _context;

        public SurveyController(AppDbContext context)
        {
            _context = context;
        }

        // Get Surveys
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Survey>>> GetSurveys()
        {
            return await _context.Surveys.ToListAsync();
        }


        // Get Survey by ID
        [HttpGet("{id:int}")]
        public async Task<ActionResult<Survey>> GetSurvey(int id)
        {
            var survey = await _context.Surveys.FindAsync(id);

            if (survey == null)
            {
                return NotFound();
            }

            return survey;
        }

        // Update Survey
        [HttpPut("/update/{id:int}")]
        public async Task<IActionResult> PutSurvey(int id, Survey survey)
        {
            if (id != survey.SurveyId)
            {
                return BadRequest();
            }

            _context.Entry(survey).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SurveyExists(id))
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

        // Create Survey
        [HttpPost("/create")]
        public async Task<ActionResult<Survey>> CreateSurvey(Survey survey)
        {
            _context.Surveys.Add(survey);
            await _context.SaveChangesAsync();

            return survey;
        }

        [HttpDelete("/delete/{id:int}")]
        public async Task<ActionResult> DeleteSurvey(int id)
        {
            var survey = await _context.Surveys.FindAsync(id);

            if (survey == null)
            {
                return NotFound();
            }
            _context.Attach(survey);
            _context.Remove(survey);
            await _context.SaveChangesAsync();
            return Ok();
        }

        // Check if Survey exists
        private bool SurveyExists(int surveyId)
        {
            return (_context.Surveys?.Any(e => e.SurveyId == surveyId)).GetValueOrDefault();
        }
    }
}
