using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RecipieApi.Migrations
{
    /// <inheritdoc />
    public partial class newRecipe : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ImagePath",
                table: "Recipies",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Ingredients",
                table: "Recipies",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Instructions",
                table: "Recipies",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Notes",
                table: "Recipies",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImagePath",
                table: "Recipies");

            migrationBuilder.DropColumn(
                name: "Ingredients",
                table: "Recipies");

            migrationBuilder.DropColumn(
                name: "Instructions",
                table: "Recipies");

            migrationBuilder.DropColumn(
                name: "Notes",
                table: "Recipies");
        }
    }
}
