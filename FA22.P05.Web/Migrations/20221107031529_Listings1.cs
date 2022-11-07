using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FA22.P05.Web.Migrations
{
    public partial class Listings1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Condition",
                table: "Listing");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Condition",
                table: "Listing",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
