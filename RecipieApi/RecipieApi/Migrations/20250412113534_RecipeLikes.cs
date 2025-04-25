using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RecipieApi.Migrations
{
    /// <inheritdoc />
    public partial class RecipeLikes : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "RecipeLikes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RecipieId = table.Column<int>(type: "int", nullable: false),
                    LikedById = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RecipeLikes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RecipeLikes_Recipies_RecipieId",
                        column: x => x.RecipieId,
                        principalTable: "Recipies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade); // keep this
                    table.ForeignKey(
                        name: "FK_RecipeLikes_Users_LikedById",
                        column: x => x.LikedById,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict); // change this one
                });

            migrationBuilder.CreateIndex(
                name: "IX_RecipeLikes_LikedById",
                table: "RecipeLikes",
                column: "LikedById");

            migrationBuilder.CreateIndex(
                name: "IX_RecipeLikes_RecipieId",
                table: "RecipeLikes",
                column: "RecipieId");
        }


        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "RecipeLikes");
        }
    }
}
