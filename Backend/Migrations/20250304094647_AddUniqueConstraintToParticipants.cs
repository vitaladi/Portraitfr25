using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class AddUniqueConstraintToParticipants : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_participants_Email",
                table: "participants",
                column: "Email",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_participants_Instagram",
                table: "participants",
                column: "Instagram",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_participants_Email",
                table: "participants");

            migrationBuilder.DropIndex(
                name: "IX_participants_Instagram",
                table: "participants");
        }
    }
}
