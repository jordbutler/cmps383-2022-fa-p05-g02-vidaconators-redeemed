using FA22.P05.Web.Data;
using FA22.P05.Web.Features.Authorization;
using FA22.P05.Web.Features.Listings;
using FA22.P05.Web.Features.Products;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FA22.P05.Web.Controllers
{
    [Route("api/products")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly DbSet<Product> products;
        private readonly DataContext dataContext;

        public ProductsController(DataContext dataContext)
        {
            this.dataContext = dataContext;
            products = dataContext.Set<Product>();
        }

        [HttpGet]
        public IQueryable<ProductDto> GetAllProducts()
        {
            return GetProductDtos(products);
        }

        [HttpGet]
        [Route("{id}")]
        public ActionResult<ProductDto> GetProductById(int id)
        {
            var result = GetProductDtos(products.Where(x => x.Id == id)).FirstOrDefault();
            if (result == null)
            {
                return NotFound();
            }

            return Ok(result);
        }

        [HttpGet]
        [Route("{id}/listings")]
        public ActionResult<List<ListingDto>> GetProductListings(int id)
        {
            if (!products.Any(x => x.Id == id))
            {
                return NotFound();
            }

            var now = DateTimeOffset.UtcNow;
            var activeListingWithProduct = products
                .Where(x => x.Id == id)
                .SelectMany(x => x.Items)
                .SelectMany(x => x.ItemListings)
                .Select(x => x.Listing!)
                .Where(x => x.StartUtc <= now && now <= x.EndUtc)
                .Distinct();
            var listingDtos = ListingsController.GetListingDtos(activeListingWithProduct).ToList();

            return Ok(listingDtos);
        }

        [HttpPost]
        [Authorize(Roles = RoleNames.Admin)]
        public ActionResult<ProductDto> CreateProduct(ProductDto dto)
        {
            if (IsInvalid(dto))
            {
                return BadRequest();
            }

            var product = new Product
            {
                Name = dto.Name!,
                Description = dto.Description,
            };
            products.Add(product);

            dataContext.SaveChanges();

            dto.Id = product.Id;

            return CreatedAtAction(nameof(GetProductById), new { id = dto.Id }, dto);
        }

        [HttpPut]
        [Route("{id}")]
        [Authorize(Roles = RoleNames.Admin)]
        public ActionResult<ProductDto> UpdateProduct(int id, ProductDto dto)
        {
            if (IsInvalid(dto))
            {
                return BadRequest();
            }

            var product = products.FirstOrDefault(x => x.Id == id);
            if (product == null)
            {
                return NotFound();
            }

            product.Name = dto.Name!;
            product.Description = dto.Description;

            dataContext.SaveChanges();

            dto.Id = product.Id;

            return Ok(dto);
        }

        [HttpDelete]
        [Route("{id}")]
        [Authorize(Roles = RoleNames.Admin)]
        public ActionResult DeleteProduct(int id)
        {
            var product = products.FirstOrDefault(x => x.Id == id);
            if (product == null)
            {
                return NotFound();
            }

            products.Remove(product);

            dataContext.SaveChanges();

            return Ok();
        }

        private static bool IsInvalid(ProductDto dto)
        {
            return string.IsNullOrWhiteSpace(dto.Name) ||
                   dto.Name.Length > 120 ||
                   string.IsNullOrWhiteSpace(dto.Description);
        }

        private static IQueryable<ProductDto> GetProductDtos(IQueryable<Product> products)
        {
            return products
                .Select(x => new ProductDto
                {
                    Id = x.Id,
                    Name = x.Name,
                    Description = x.Description,
                });
        }
    }
}
