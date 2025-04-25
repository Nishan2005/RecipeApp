using Microsoft.EntityFrameworkCore;

namespace RecipieApi.Models
{
    public class RecipeContext : DbContext
    {
        public DbSet<Recipie> Recipies { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<RecipeLike> RecipeLikes { get; set; }
        public DbSet<Reviews> Reviews { get; set; }

        public RecipeContext(DbContextOptions options) : base(options)
        {
            
        }
    }
}
