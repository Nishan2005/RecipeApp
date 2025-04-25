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
    public class RecipeLikesController : ControllerBase
    {
        private readonly RecipeContext _context;

        public RecipeLikesController(RecipeContext context)
        {
            _context = context;
        }

        // GET: api/RecipeLikes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RecipeLike>>> GetRecipeLikes()
        {
            return await _context.RecipeLikes.ToListAsync();
        }

        // GET: api/RecipeLikes/5
        [HttpGet("Likes")]
        public async Task<ActionResult<RecipeLike>> GetRecipeLike(int userId, int recipeId)
        {
            var recipeLike = await _context.RecipeLikes.FirstOrDefaultAsync(x => x.LikedById == userId & x.RecipieId == recipeId);

            if (recipeLike == null)
            {
                return NotFound(false);
            }

            return Ok(true);
        }



        // PUT: api/RecipeLikes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRecipeLike(int id, RecipeLike recipeLike)
        {
            if (id != recipeLike.Id)
            {
                return BadRequest();
            }

            _context.Entry(recipeLike).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RecipeLikeExists(id))
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

        public class LikesViewModel
        {
            public int userId { get; set; }
            public int recipeId { get; set; }
            public int logUserId { get; set; }
        }
        // POST: api/RecipeLikes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<RecipeLike>> PostRecipeLike(LikesViewModel recipeLike)
        {
            var RecipeLikes = new RecipeLike
            {
                LikedById = recipeLike.logUserId,
                RecipieId = recipeLike.recipeId,
                CreatorId = recipeLike.userId
            };
            _context.RecipeLikes.Add(RecipeLikes);
            await _context.SaveChangesAsync();

            return Ok(true);
        }

        // DELETE: api/RecipeLikes/5
        [HttpDelete("Delete")]
        public async Task<IActionResult> DeleteRecipeLike(int userId, int recipeId)
        {
            var recipeLike = await _context.RecipeLikes.FirstOrDefaultAsync(x => x.LikedById == userId && x.RecipieId == recipeId);
            if (recipeLike == null)
            {
                return NotFound();
            }

            _context.RecipeLikes.Remove(recipeLike);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool RecipeLikeExists(int id)
        {
            return _context.RecipeLikes.Any(e => e.Id == id);
        }
    }
}
