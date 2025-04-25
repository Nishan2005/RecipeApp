using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RecipieApi.Migrations
{
    /// <inheritdoc />
    public partial class likesrevamp : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CreatorId",
                table: "RecipeLikes",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CreatorId",
                table: "RecipeLikes");
        }
    }
}
