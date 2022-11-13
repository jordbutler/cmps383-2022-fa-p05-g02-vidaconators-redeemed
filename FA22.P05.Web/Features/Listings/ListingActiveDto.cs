using FA22.P05.Web.Features.ItemListings;

namespace FA22.P05.Web.Features.Listings
{
    public class ListingActiveDto
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public decimal Price { get; set; }
        public virtual ICollection<ItemListing> ItemsForSale { get; set; } = new List<ItemListing>();
    }
}
