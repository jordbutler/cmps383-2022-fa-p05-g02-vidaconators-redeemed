using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FA22.P05.Web.Migrations
{
    public partial class Mami : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Condition",
                table: "Listing",
                type: "nvarchar(1)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Country",
                table: "Listing",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Language",
                table: "Listing",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Publisher",
                table: "Listing",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Version",
                table: "Listing",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Condition",
                table: "Listing");

            migrationBuilder.DropColumn(
                name: "Country",
                table: "Listing");

            migrationBuilder.DropColumn(
                name: "Language",
                table: "Listing");

            migrationBuilder.DropColumn(
                name: "Publisher",
                table: "Listing");

            migrationBuilder.DropColumn(
                name: "Version",
                table: "Listing");
        }
    }
}
