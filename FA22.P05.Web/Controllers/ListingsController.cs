using System.Diagnostics.CodeAnalysis;
using FA22.P05.Web.Data;
using FA22.P05.Web.Extensions;
using FA22.P05.Web.Features.Authorization;
using FA22.P05.Web.Features.ItemListings;
using FA22.P05.Web.Features.Items;
using FA22.P05.Web.Features.Listings;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FA22.P05.Web.Controllers
{
    [Route("api/listings")]
    [ApiController]
    public class ListingsController : ControllerBase
    {
        private readonly DbSet<Listing> listings;
        private readonly DataContext dataContext;
        private readonly DbSet<Item> items;

        public ListingsController(DataContext dataContext)
        {
            this.dataContext = dataContext;
            listings = dataContext.Set<Listing>();
            items = dataContext.Set<Item>();
        }

        [HttpGet]
        [Route("active")]
        public IQueryable<ListingDto> GetActiveListings()
        {
            var now = DateTimeOffset.UtcNow;
            return GetListingDtos(listings.Where(x => x.StartUtc <= now && now <= x.EndUtc));
        }

        [HttpGet]
        [Route("{id}")]
        public ActionResult<ListingDto> GetListingById(int id)
        {
            var result = GetListingDtos(listings.Where(x => x.Id == id)).FirstOrDefault();
            if (result == null)
            {
                return NotFound();
            }

            return Ok(result);
        }

        [HttpPost]
        [Authorize]
        public ActionResult<ListingDto> CreateListing(ListingDto dto)
        {
            if (IsInvalid(dto))
            {
                return BadRequest();
            }

            var listing = new Listing
            {
                Name = dto.Name!,
                Description = dto.Description,
                Price = dto.Price!.Value,
                StartUtc = dto.StartUtc!.Value,
                EndUtc = dto.EndUtc!.Value,
                OwnerId = User.GetCurrentUserId() ?? throw new Exception("Missing user id")
            };
            listings.Add(listing);

            dataContext.SaveChanges();

            dto.Id = listing.Id;

            return CreatedAtAction(nameof(GetListingById), new { id = dto.Id }, dto);
        }

        [HttpGet]
        [Route("{id}/items")]
        public ActionResult<List<ItemDto>> GetItemsForSale(int id)
        {
            if (!listings.Any(x => x.Id == id))
            {
                return NotFound();
            }

            var itemsForSale = listings
                .Where(x => x.Id == id)
                .SelectMany(x => x.ItemsForSale)
                .Select(x => x.Item!);

            var itemDtos = ItemsController.GetItemDtos(itemsForSale).ToList();

            return itemDtos;
        }

        [HttpPut]
        [Route("{id}/items")]
        [Authorize]
        public ActionResult<ListingDto> SetItemsForSale(int id, List<ItemDto> requestedItems)
        {
            var listing = listings
                .Include(x => x.ItemsForSale)
                .FirstOrDefault(x => x.Id == id);
            if (listing == null)
            {
                return NotFound();
            }

            if (!User.IsInRole(RoleNames.Admin) && listing.OwnerId != User.GetCurrentUserId())
            {
                return Forbid();
            }

            foreach (var itemDto in requestedItems)
            {
                var item = items.FirstOrDefault(x => x.Id == itemDto.Id);
                if (item == null)
                {
                    return BadRequest();
                }

                if (listing.ItemsForSale.Any(x => x.ItemId == item.Id))
                {
                    // already present
                    continue;
                }

                listing.ItemsForSale.Add(new ItemListing
                {
                    ItemId = item.Id,
                });
            }

            foreach (var saleItem in listing.ItemsForSale.ToArray())
            {
                if (requestedItems.Any(x => x.Id == saleItem.ItemId))
                {
                    // was requested
                    continue;
                }

                listing.ItemsForSale.Remove(saleItem);
            }

            dataContext.SaveChanges();

            return NoContent();
        }

        [HttpDelete]
        [Route("{id}")]
        [Authorize]
        public ActionResult DeleteListing(int id)
        {
            var listing = listings.FirstOrDefault(x => x.Id == id);
            if (listing == null)
            {
                return NotFound();
            }

            if (!User.IsInRole(RoleNames.Admin) && listing.OwnerId != User.GetCurrentUserId())
            {
                return Forbid();
            }

            listings.Remove(listing);

            dataContext.SaveChanges();

            return Ok();
        }

        private static bool IsInvalid(ListingDto dto)
        {
            return string.IsNullOrWhiteSpace(dto.Name) ||
                   dto.Name.Length > 120 ||
                   dto.StartUtc == null ||
                   dto.EndUtc == null ||
                   dto.StartUtc >= dto.EndUtc ||
                   string.IsNullOrWhiteSpace(dto.Description);
        }

        public static IQueryable<ListingDto> GetListingDtos(IQueryable<Listing> listings)
        {
            return listings
                .Select(x => new ListingDto
                {
                    Id = x.Id,
                    Name = x.Name,
                    Description = x.Description,
                    Price = x.Price,
                    StartUtc = x.StartUtc,
                    EndUtc = x.EndUtc
                });
        }
    }
}
