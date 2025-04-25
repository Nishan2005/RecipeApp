namespace RecipieApi.ViewModels
{
    public class RecipeViewModel
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public string PrepTime { get; set; }
        public string Servings { get; set; }
        public string Difficulty { get; set; }
        public string Ingredients { get; set; }
        public List<string> Instructions { get; set; }
        public IFormFile Photo { get; set; }
        public int Category { get; set; }
        public string? Notes { get; set; }
        public int CreatedBy { get; set; }
    }
    public class NewRecipeViewModel
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string PrepTime { get; set; }
        public string Servings { get; set; }
        public string Difficulty { get; set; }
        public string Ingredients { get; set; }
        public List<string> Instructions { get; set; }
        public int Category { get; set; }
        public string? Notes { get; set; }
        public int CreatedBy { get; set; }
    }


    public class IngredientDto
    {
        public string name { get; set; }
        public string amount { get; set; }
        public string unit { get; set; }
    }
}
