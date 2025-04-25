using Humanizer;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using RecipieApi.Migrations;
using RecipieApi.Models;
using RecipieApi.ViewModels;

namespace RecipieApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecipeController : ControllerBase
    {
        private readonly IWebHostEnvironment _env;
        private readonly RecipeContext _context;

        public RecipeController(IWebHostEnvironment env, RecipeContext context)
        {
            _env = env;
            _context = context;
        }

        //[HttpPost("upload")]
        //public async Task<IActionResult> UploadImage([FromForm] IFormFile image)
        //{
        //    if (image == null || image.Length == 0)
        //        return BadRequest("No file uploaded.");

        //    var uploadsFolder = Path.Combine(_env.WebRootPath, "uploads");
        //    if (!Directory.Exists(uploadsFolder))
        //        Directory.CreateDirectory(uploadsFolder);

        //    var fileName = Guid.NewGuid().ToString() + Path.GetExtension(image.FileName);
        //    var filePath = Path.Combine(uploadsFolder, fileName);
        //    var dbPath = "/uploads/" + fileName;

        //    using (var stream = new FileStream(filePath, FileMode.Create))
        //    {
        //        await image.CopyToAsync(stream);
        //    }

        //    // Save to DB
        //    var productImage = new ProductImage
        //    {
        //        FileName = fileName,
        //        FilePath = dbPath,
        //        UploadedAt = DateTime.Now
        //    };
        //    _context.ProductImages.Add(productImage);
        //    await _context.SaveChangesAsync();

        //    return Ok(productImage);
        //}
        

        [HttpGet("all")]
        public async Task<IActionResult> GetAllImages()
        {
            var recipe = await _context.Recipies
                             .Select(r => new
                             {
                                 r.Id,
                                 r.Title,
                                 r.Description,
                                 r.PrepTime,
                                 r.Servings,
                                 r.Difficulty,
                                 r.Ingredients,
                                 r.Instructions,
                                 r.ImagePath,
                                 r.Notes,
                                 r.categoryId,
                                 Category = r.category.Name
                             }).ToListAsync();
            return Ok(recipe);
        }
        [HttpGet("filterId")]
        public async Task<IActionResult> GetFilteredId(int Id)
        {
            var recipe = await _context.Recipies
        .Where(r => r.Id == Id)
        .Select(r => new
        {
            r.Id,
            r.Title,
            r.Description,
            r.PrepTime,
            r.Servings,
            r.Difficulty,
            r.Ingredients,
            r.Instructions,
            r.ImagePath,
            r.Notes,
            r.categoryId,
            Category = r.category.Name,
            r.UserId
            
        })
        .FirstOrDefaultAsync();
            return Ok(recipe);
        }
        [HttpGet("filterUserId")]
        public async Task<IActionResult> GetFilteredUserId(int Id)
        {
            var recipe = await _context.Recipies
                 .Where(r => r.UserId == Id)
                 .Select(r => new
                   {
                        r.Id,
                        r.Title,
                        r.Description,
                        r.PrepTime,
                        r.Servings,
                        r.Difficulty,
                        r.Ingredients,
                        r.Instructions,
                        r.ImagePath,
                        r.Notes,
                        r.categoryId,
                       Category = r.category.Name
                    }).ToListAsync();

            return Ok(recipe);

        }
        [HttpPost]
        [Route("products")]
        public async Task<IActionResult> CreateProduct([FromForm] RecipeViewModel model)
        {
            try
            {
                if(model == null)
                {
                    return BadRequest(false);
                }
                var ingredientList = JsonConvert.DeserializeObject<List<IngredientDto>>(model.Ingredients);
                string jsonInstructions = JsonConvert.SerializeObject(model.Instructions);


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

                var Recipe = new Recipie
                {
                    Title = model.Title,
                    Description = model.Description,
                    ImagePath = relativePath,
                    PrepTime = model.PrepTime,
                    categoryId = model.Category,
                    Difficulty = model.Difficulty,
                    Servings = model.Servings,
                    Notes = model.Notes,
                    Instructions = jsonInstructions,
                    Ingredients = model.Ingredients,
                    UserId = model.CreatedBy
                };

                _context.Recipies.Add(Recipe);
                await _context.SaveChangesAsync();

                return Ok(true);
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
            
        }
        [HttpPost]
        [Route("editRecipe")]
        public async Task<IActionResult> EditProduct([FromForm] NewRecipeViewModel dto
            )
        {
            var recipe = await _context.Recipies.FindAsync(dto.Id);
            if (recipe == null)
            {
                return NotFound(false);
            }

            recipe.Title = dto.Title;
            recipe.Description = dto.Description;
            recipe.PrepTime = dto.PrepTime;
            recipe.Servings = dto.Servings;
            recipe.Difficulty = dto.Difficulty;
            recipe.Notes = dto.Notes;
            recipe.categoryId = dto.Category;
            recipe.Ingredients = dto.Ingredients;
            recipe.Instructions = JsonConvert.SerializeObject(dto.Instructions);
            await _context.SaveChangesAsync();

            return Ok(true);

        }
        [HttpGet("Likes")]
        public async Task<IActionResult> GetLikes(int userId)
        {
            var recipeIds = await _context.Recipies
                .Where(x => x.UserId == userId)
                .Select(x => x.Id)
                .ToListAsync();
            var totalRecipe = recipeIds.Count();
            var totalLikes = await _context.RecipeLikes
                .Where(like => recipeIds.Contains(like.RecipieId))
                .CountAsync();
            double avgRating = 0;

            var hasReviews = await _context.Reviews
                .AnyAsync(r => recipeIds.Contains(r.RecipeId));

            if (hasReviews)
            {
                avgRating = await _context.Reviews
                    .Where(r => recipeIds.Contains(r.RecipeId))
                    .AverageAsync(r => r.Rating);
                avgRating = Math.Round(avgRating, 2);
            }
            return Ok(new { totalRecipe , totalLikes, avgRating });
        }
        [HttpGet("home")]
        public async Task<IActionResult> GetHomeRecipe()
        {
            var topRecipes = await _context.RecipeLikes
                .GroupBy(r => r.RecipieId)
                .Select(group => new
                {
                    RecipeId = group.Key,
                    TotalLikes = group.Count()
                })
                .OrderByDescending(x => x.TotalLikes)
                .Take(4)
                .ToListAsync();

            // Optional: If you want to include the full recipe details
            var recipeIds = topRecipes.Select(r => r.RecipeId).ToList();
            var recipes = await _context.Recipies
                .Where(r => recipeIds.Contains(r.Id))
                .ToListAsync();

            // You can join them manually if needed
            var result = recipes.Select(recipe => new
            {
                Recipe = recipe,
                Likes = topRecipes.FirstOrDefault(r => r.RecipeId == recipe.Id)?.TotalLikes ?? 0
            });

            return Ok(result.OrderByDescending(x => x.Likes));
        }
        [HttpGet("RecipeLikes")]
        public async Task<IActionResult> GetLikesRecipe(int recipeId)
        {
            var totalLikes = await _context.RecipeLikes
                .Where(like => recipeId == like.RecipieId)
                .CountAsync();
            return Ok(totalLikes);
        }
        [HttpGet("likedRecipe")]
        public async Task<IActionResult> GetFavouret(int userId)
        {
            var likedRecipeIds = await _context.RecipeLikes
     .Where(like => like.LikedById == userId)
     .Select(like => like.RecipieId)
     .ToListAsync();

            var recipes = await _context.Recipies
                .Where(r => likedRecipeIds.Contains(r.Id))
                .Select(r => new
                {
                    r.Id,
                    r.Title,
                    r.Description,
                    r.PrepTime,
                    r.Servings,
                    r.Difficulty,
                    r.Ingredients,
                    r.Instructions,
                    r.ImagePath,
                    r.Notes,
                    r.categoryId,
                    Category = r.category.Name
                }).ToListAsync();

            return Ok(recipes);

        }
        [HttpDelete]
        [Route("deleteRecipe/{id}")]
        public async Task<IActionResult> DeleteRecipe(int id)
        {
            try
            {
                var recipe = await _context.Recipies.FindAsync(id);

                if (recipe == null)
                {
                    return NotFound("Recipe not found.");
                }

                // Remove related RecipeLikes first
                var recipeLikes = _context.RecipeLikes.Where(rl => rl.RecipieId == id);
                _context.RecipeLikes.RemoveRange(recipeLikes);

                // Remove the recipe itself
                _context.Recipies.Remove(recipe);

                await _context.SaveChangesAsync();

                return Ok("Recipe deleted successfully.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }


    }


}

