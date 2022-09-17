using FA22.P05.Web.Features.Items;

namespace FA22.P05.Web.Features.Products;

public class Product
{
    public int Id { get; set; }

    public string Name { get; set; } = string.Empty;

    public string? Description { get; set; }

    public virtual ICollection<Item> Items { get; set; } = new List<Item>();
}
