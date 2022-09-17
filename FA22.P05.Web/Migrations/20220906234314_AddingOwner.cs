using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FA22.P05.Web.Migrations
{
    public partial class AddingOwner : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "OwnerId",
                table: "Listing",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "OwnerId",
                table: "Item",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Listing_OwnerId",
                table: "Listing",
                column: "OwnerId");

            migrationBuilder.CreateIndex(
                name: "IX_Item_OwnerId",
                table: "Item",
                column: "OwnerId");

            migrationBuilder.AddForeignKey(
                name: "FK_Item_AspNetUsers_OwnerId",
                table: "Item",
                column: "OwnerId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Listing_AspNetUsers_OwnerId",
                table: "Listing",
                column: "OwnerId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Item_AspNetUsers_OwnerId",
                table: "Item");

            migrationBuilder.DropForeignKey(
                name: "FK_Listing_AspNetUsers_OwnerId",
                table: "Listing");

            migrationBuilder.DropIndex(
                name: "IX_Listing_OwnerId",
                table: "Listing");

            migrationBuilder.DropIndex(
                name: "IX_Item_OwnerId",
                table: "Item");

            migrationBuilder.DropColumn(
                name: "OwnerId",
                table: "Listing");

            migrationBuilder.DropColumn(
                name: "OwnerId",
                table: "Item");
        }
    }
}
