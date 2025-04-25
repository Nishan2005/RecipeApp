namespace RecipieApi.Models
{
    public class RecipeLike
    {
        public int Id { get; set; }
        public int CreatorId { get; set; }
        public int RecipieId { get; set; }
        public int LikedById { get; set; }
        public User LikedBy { get; set; }
        public Recipie Recipie { get; set; }
    }
}
