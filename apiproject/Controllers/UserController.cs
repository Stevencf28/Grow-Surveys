using apiproject.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace apiproject.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : Controller
    {
        private readonly AppDbContext _context;
        public UserController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            return await _context.Users.ToListAsync();
        }

        // POST: /login
        [HttpPost("/login")]
        public async Task<ActionResult<User>> Login([FromForm] User user)
        {
            if (UserExists(user.UserName))
            {
                Console.WriteLine("Found User");
                var User = await _context.Users.FindAsync(user.UserName);
                if (User.Password.Equals(user.Password))
                {
                    Console.WriteLine("Login Success!");
                    return User;
                }
            }
            return Content("Incorrect Credentials!");
        }

        // POST: /register
        [HttpPost("/register")]
        public async Task<ActionResult<User>> Register([FromForm] User user)
        {
            if (UserExists(user.UserName))
            {
                return Content("User already exists!");
            }
            var nextId = _context.Users.Count() + 1;
            user.UserId = nextId;
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return user;
            
        }


        // Checks if user exists
        private bool UserExists(string username)
        {
            return (_context.Users?.Any(e => e.UserName == username)).GetValueOrDefault();
        }
    }
}
