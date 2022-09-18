using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FA22.P05.Web.Migrations
{
    public partial class Yeeee : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Year",
                table: "Listing",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Year",
                table: "Listing");
        }
    }
}
