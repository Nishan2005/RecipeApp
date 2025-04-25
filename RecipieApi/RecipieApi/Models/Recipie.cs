namespace RecipieApi.Models
{
    public class Recipie
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string? Description { get; set; }
        public string? ImagePath { get; set; }
        public string? PrepTime { get; set; }
        public int categoryId { get; set; }
        public string? Difficulty { get; set; }
        public string? Servings { get; set; }
        public string? Notes { get; set; }
        public string Instructions { get; set; }
        public string Ingredients { get; set; }
        public Category category { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
    }
}
