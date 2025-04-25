using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using RecipieApi.Migrations;
using RecipieApi.Models;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authorization;

namespace RecipieApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly RecipeContext _context;
        private readonly IWebHostEnvironment _env;

        public UsersController(IWebHostEnvironment env, RecipeContext context)
        {
            _env = env;
            _context = context;
        }

        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            return await _context.Users.ToListAsync();
        }
        
        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        // PUT: api/Users/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(int id, User user)
        {
            if (id != user.Id)
            {
                return BadRequest();
            }

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
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

        [HttpPost]
        public async Task<ActionResult<User>> PostUser(User user)
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUser", new { id = user.Id }, user);
        }

       

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserExists(int id)
        {
            return _context.Users.Any(e => e.Id == id);
        }
        //[HttpPost("Login")]
        //public async Task<ActionResult<LoginResponse>> Login([FromBody] LoginRequest model)
        //{
        //    if (string.IsNullOrEmpty(model.Email) || string.IsNullOrEmpty(model.Password))
        //    {
        //        return BadRequest(new { message = "Email and password are required" });
        //    }

        //    // Find user by email
        //    var user = await _context.Users.FirstOrDefaultAsync(x => x.Email == model.Email);

        //    // Check if user exists and password matches
        //    if (user == null || user.Password != model.Password)
        //    {
        //        return Unauthorized(new { message = "Invalid email or password" });
        //    }

        //    // Return user info with a simple auth token (could be a GUID or anything unique)
        //    return Ok(new LoginResponse
        //    {
        //        Id = user.Id,
        //        Email = user.Email,
        //        FullName = user.Name,
        //        Token = Guid.NewGuid().ToString() // Simple unique token
        //    });
        //}
       

[HttpPost("Login")]
    public async Task<ActionResult<LoginResponse>> Login([FromBody] LoginRequest model)
    {
        if (string.IsNullOrEmpty(model.Email) || string.IsNullOrEmpty(model.Password))
        {
            return BadRequest(new { message = "Email and password are required" });
        }

        var user = await _context.Users.FirstOrDefaultAsync(x => x.Email == model.Email);
        if (user == null || user.Password != model.Password)
        {
            return Unauthorized(new { message = "Invalid email or password" });
        }

        // Create JWT token
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes("ThisIsA32CharLongSecretKey!!123456"); // Store in config
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new[]
            {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Name, user.Name),
            new Claim(ClaimTypes.Email, user.Email),
            new Claim("UserType", user.Type.ToString())
        }),
            Expires = DateTime.UtcNow.AddHours(2),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };

        var token = tokenHandler.CreateToken(tokenDescriptor);

        return Ok(new LoginResponse
        {
            Id = user.Id,
            Email = user.Email,
            FullName = user.Name,
            Token = tokenHandler.WriteToken(token)
        });
    }
        
        [Authorize]
        [HttpGet("UserProfile")]
        public async Task<ActionResult<Users>> GetUserProfile()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var user = await _context.Users.FindAsync(int.Parse(userId));
            return Ok(user);
        }


        // Simple request and response models
        public class LoginRequest
        {
            public string Email { get; set; }
            public string Password { get; set; }
        }

        public class LoginResponse
        {
            public int Id { get; set; }
            public string Email { get; set; }
            public string FullName { get; set; }
            public string Token { get; set; }
        }
        [HttpPost("Register")]
        public async Task<ActionResult<User>> Register([FromBody] RegisterRequest model)
        {
            if (string.IsNullOrEmpty(model.Email) || string.IsNullOrEmpty(model.Password))
            {
                return BadRequest(new { message = "Email and password are required" });
            }

            // Check if user with this email already exists
            var existingUser = await _context.Users.FirstOrDefaultAsync(x => x.Email == model.Email);
            if (existingUser != null)
            {
                return BadRequest(new { message = "User with this email already exists" });
            }

            // Create new user
            var user = new User
            {
                Email = model.Email,
                Password = model.Password,
                Name = model.FullName,
                Type = model.type
            };

            // Add to database
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            // Return success
            return CreatedAtAction("GetUser", new { id = user.Id }, user);
        }

        public class RegisterRequest
        {
            public string Email { get; set; }
            public string Password { get; set; }
            public string FullName { get; set; }
            public int type { get; set; }
        }
        public class updateProfile
        {
            public int Id { get; set; }
            public string fullName { get; set; }
            public IFormFile Photo { get; set; }
        }
        [HttpPost("picture")]
        public async Task<ActionResult<User>> addPicture([FromForm] updateProfile model)
        {
            if (model == null)
            {
                return BadRequest(false);
            }
            if (model.Photo == null || model.Photo.Length == 0)
                return BadRequest("Image is required.");

            var uploadsFolder = Path.Combine(_env.WebRootPath, "uploads");
            if (!Directory.Exists(uploadsFolder))
                Directory.CreateDirectory(uploadsFolder);

            var uniqueFileName = Guid.NewGuid().ToString() + Path.GetExtension(model.Photo.FileName);
            var filePath = Path.Combine(uploadsFolder, uniqueFileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await model.Photo.CopyToAsync(stream);
            }

            var relativePath = "/uploads/" + uniqueFileName;
            var user = await _context.Users.FindAsync(model.Id);
            if (user == null)
            {
                return NotFound(false);
            }
            user.Name = model.fullName;
            user.ImagePath = relativePath;
            await _context.SaveChangesAsync();
            return Ok(true);
        }
    }
}
