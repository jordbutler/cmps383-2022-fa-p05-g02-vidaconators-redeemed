using FA22.P05.Web.Features.Items;
using System.Security.Policy;

namespace FA22.P05.Web.Features.Listings;

public class ListingDto
{
    public int Id { get; set; }
    public string? Name { get; set; }
    public string? Description  { get; set; }
    public decimal Price { get; set; }
    public string? Publisher { get; set; }
    public string? Version { get; set; }
    public string? Country { get; set; }
    public string? Language { get; set; }
    public int Year { get; set; }
    // public string? Condition { get; set; }
    public string? Catagory { get; set; }
    public DateTimeOffset? StartUtc { get; set; }
    public DateTimeOffset? EndUtc { get; set; }
    public IEnumerable<ItemDto> ItemsForSale { get; set; }
}