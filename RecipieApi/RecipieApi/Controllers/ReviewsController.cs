using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RecipieApi.Models;

namespace RecipieApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReviewsController : ControllerBase
    {
        private readonly RecipeContext _context;

        public ReviewsController(RecipeContext context)
        {
            _context = context;
        }

        // GET: api/Reviews
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Reviews>>> GetReviews()
        {
            return await _context.Reviews.ToListAsync();
        }

        // GET: api/Reviews/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Reviews>> GetReviews(int id)
        {
            var avgRating = await _context.Reviews
    .Where(r => r.RecipeId == id)
    .AverageAsync(r => r.Rating);

            var reviews = await _context.Reviews
                .Where(x => x.RecipeId == id)
                .Select(x => new
                {
                    x.Description,
                    UserName = x.User.Name,
                })
                .ToListAsync();

            if (reviews == null || reviews.Count == 0)
            {
                return NotFound();
            }

            return Ok(new { reviews, avgRating});

        }

        // PUT: api/Reviews/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutReviews(int id, Reviews reviews)
        {
            if (id != reviews.Id)
            {
                return BadRequest();
            }

            _context.Entry(reviews).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ReviewsExists(id))
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

        public class ReviewsViewmodel
        {
            public string Review { get; set; }
            public int UserId { get; set; }
            public int RecipeId { get; set; }
            public int Rate { get; set; }

        }
        // POST: api/Reviews
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Reviews>> PostReviews(ReviewsViewmodel reviews)
        {
            var data = new Reviews
            {
                Description = reviews.Review,
                UserId = reviews.UserId,
                RecipeId = reviews.RecipeId,
                Rating = reviews.Rate
            };
            _context.Reviews.Add(data);
            await _context.SaveChangesAsync();

            return Ok(true);
        }

        // DELETE: api/Reviews/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteReviews(int id)
        {
            var reviews = await _context.Reviews.FindAsync(id);
            if (reviews == null)
            {
                return NotFound();
            }

            _context.Reviews.Remove(reviews);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ReviewsExists(int id)
        {
            return _context.Reviews.Any(e => e.Id == id);
        }
    }
}
