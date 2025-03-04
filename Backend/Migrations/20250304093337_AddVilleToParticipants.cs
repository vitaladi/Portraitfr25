using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class AddVilleToParticipants : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "nom",
                table: "participants",
                newName: "Nom");

            migrationBuilder.RenameColumn(
                name: "instagram",
                table: "participants",
                newName: "Instagram");

            migrationBuilder.RenameColumn(
                name: "email",
                table: "participants",
                newName: "Email");

            migrationBuilder.RenameColumn(
                name: "description",
                table: "participants",
                newName: "Description");

            migrationBuilder.RenameColumn(
                name: "categorie",
                table: "participants",
                newName: "Categorie");

            migrationBuilder.RenameColumn(
                name: "photo_url",
                table: "participants",
                newName: "PhotoUrl");

            migrationBuilder.RenameColumn(
                name: "inscription_date",
                table: "participants",
                newName: "InscriptionDate");

            migrationBuilder.RenameColumn(
                name: "certificat_photo",
                table: "participants",
                newName: "CertificatPhoto");

            migrationBuilder.AlterColumn<string>(
                name: "Nom",
                table: "participants",
                type: "character varying(100)",
                maxLength: 100,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<string>(
                name: "Instagram",
                table: "participants",
                type: "character varying(100)",
                maxLength: 100,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AddColumn<string>(
                name: "Ville",
                table: "participants",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Ville",
                table: "participants");

            migrationBuilder.RenameColumn(
                name: "Nom",
                table: "participants",
                newName: "nom");

            migrationBuilder.RenameColumn(
                name: "Instagram",
                table: "participants",
                newName: "instagram");

            migrationBuilder.RenameColumn(
                name: "Email",
                table: "participants",
                newName: "email");

            migrationBuilder.RenameColumn(
                name: "Description",
                table: "participants",
                newName: "description");

            migrationBuilder.RenameColumn(
                name: "Categorie",
                table: "participants",
                newName: "categorie");

            migrationBuilder.RenameColumn(
                name: "PhotoUrl",
                table: "participants",
                newName: "photo_url");

            migrationBuilder.RenameColumn(
                name: "InscriptionDate",
                table: "participants",
                newName: "inscription_date");

            migrationBuilder.RenameColumn(
                name: "CertificatPhoto",
                table: "participants",
                newName: "certificat_photo");

            migrationBuilder.AlterColumn<string>(
                name: "nom",
                table: "participants",
                type: "text",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "character varying(100)",
                oldMaxLength: 100);

            migrationBuilder.AlterColumn<string>(
                name: "instagram",
                table: "participants",
                type: "text",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "character varying(100)",
                oldMaxLength: 100);
        }
    }
}
