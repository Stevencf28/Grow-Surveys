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
            Console.WriteLine("Getting Survey...");
            var survey = await _context.Surveys.FindAsync(id);

            if (survey == null)
            {
                return NotFound();
            }

            return survey;
        }

        // Get Answer by ID
        [HttpGet("/answers/{id:int}")]
        public async Task<ActionResult<IEnumerable<Answer>>> GetAnswers(int id)
        {
            Console.WriteLine("Getting Answers...");
            var answers = await _context.Answers.Where(ans => ans.SurveyId == id).ToListAsync();

            if (answers == null)
            {
                return NotFound();
            }

            return answers;
        }

        [HttpGet("/answer/{id:int}")]
        public async Task<ActionResult<IEnumerable<Answer>>> GetAnswer(int id)
        {
            var answersByUser = await _context.Answers.Where(ans => ans.SurveyId == id).ToListAsync();
            if (answersByUser == null)
            {
                return NotFound();
            }
            return answersByUser;
        }

        // Update Answer
        [HttpPut("/answer/update/{id:int}")]
        public async Task<IActionResult> UpdateAnswer(int id, Answer answer)
        {
            Console.WriteLine("Updating Answer...");
            if (id != answer.AnswerId)
            {
                return BadRequest();
            }

            _context.Entry(answer).State = EntityState.Modified;

            try
            {
                Console.WriteLine("Answer Updated!");
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AnswerExists(id))
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
        public async Task<ActionResult<Survey>> CreateSurvey([FromForm] Survey survey)
        {
            if (SurveyExists(survey.SurveyId))
            {
                return Content("Survey already exists!");
            }
            var nextId = _context.Surveys.Count() + 1;
            survey.SurveyId = nextId;
            _context.Surveys.Add(survey);
            await _context.SaveChangesAsync();
            return survey;

        }

        // Answer Survey
        [HttpPost("/answer")]
        public async Task<ActionResult<Answer>> CreateAnswer([FromForm] Answer answer)
        {
            var nextId = _context.Answers.Count() + 1;
            answer.AnswerId = nextId;
            _context.Answers.Add(answer);
            await _context.SaveChangesAsync();
            return answer;

        }

        // Delete Survey
        [HttpDelete("/delete/{id:int}")]
        public async Task<ActionResult> DeleteSurvey(int id)
        {
            Console.WriteLine("Deleting Survey...");
            var survey = await _context.Surveys.FindAsync(id);

            if (survey == null)
            {
                return NotFound();
            }
            _context.Attach(survey);
            _context.Remove(survey);
            await _context.SaveChangesAsync();
            Console.WriteLine("Survey Deleted!");
            return Ok();
        }

        // Delete Answer
        [HttpDelete("/delete/answer/{id:int}")]
        public async Task<ActionResult> DeleteAnswer(int id)
        {
            Console.WriteLine("Deleting Answer...");
            var answer = await _context.Answers.FindAsync(id);

            if (answer == null)
            {
                return NotFound();
            }
            _context.Attach(answer);
            _context.Remove(answer);
            await _context.SaveChangesAsync();
            Console.WriteLine("Answer Deleted!");
            return Ok();
        }

        // Check if Survey exists
        private bool SurveyExists(int surveyId)
        {
            return (_context.Surveys?.Any(e => e.SurveyId == surveyId)).GetValueOrDefault();
        }

        // Check if Answer exists
        private bool AnswerExists(int answerId)
        {
            return (_context.Answers?.Any(e => e.AnswerId == answerId)).GetValueOrDefault();
        }
    }
}
