using FA22.P05.Web.Features.Items;
using FA22.P05.Web.Features.Listings;

namespace FA22.P05.Web.Features.ItemListings;

public class ItemListing
{
    public int Id { get; set; }

    public int ItemId { get; set; }
    public virtual Item? Item { get; set; }

    public int ListingId { get; set; }
    public virtual Listing? Listing { get; set; }
}
