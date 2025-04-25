namespace RecipieApi.Models
{
    public class Reviews
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public int Rating { get; set; }
        public int RecipeId { get; set; }
        public Recipie Recipe { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
    }
}
