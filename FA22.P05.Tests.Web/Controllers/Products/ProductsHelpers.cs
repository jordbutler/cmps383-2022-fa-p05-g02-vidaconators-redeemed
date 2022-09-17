using System.Net;
using FA22.P05.Tests.Web.Controllers.Authentication;
using FA22.P05.Tests.Web.Helpers;
using FA22.P05.Web.Features.Products;
using FluentAssertions;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace FA22.P05.Tests.Web.Controllers.Products;

internal static class ProductsHelpers
{
    internal static async Task<IAsyncDisposable?> CreateProduct(this HttpClient webClient, ProductDto request)
    {
        try
        {
            await webClient.AssertLoggedInAsAdmin();
            var httpResponse = await webClient.PostAsJsonAsync("/api/products", request);
            var resultDto = await AssertCreateProductFunctions(httpResponse, request, webClient);
            await webClient.AssertLoggedOut();
            request.Id = resultDto.Id;
            return new DeleteProduct(resultDto, webClient);
        }
        catch (Exception)
        {
            return null;
        }
    }

    internal static async Task<List<ProductDto>?> GetProducts(this HttpClient webClient)
    {
        try
        {
            var getAllRequest = await webClient.GetAsync("/api/products");
            var getAllResult = await AssertProductListAllFunctions(getAllRequest);
            return getAllResult.ToList();
        }
        catch (Exception)
        {
            return null;
        }
    }

    internal static async Task<ProductDto?> GetProduct(this HttpClient webClient)
    {
        try
        {
            var getAllRequest = await webClient.GetAsync("/api/products");
            var getAllResult = await AssertProductListAllFunctions(getAllRequest);
            return getAllResult.OrderByDescending(x => x.Id).First();
        }
        catch (Exception)
        {
            return null;
        }
    }

    internal static async Task AssertProductUpdateFunctions(this HttpResponseMessage httpResponse, ProductDto request, HttpClient webClient)
    {
        httpResponse.StatusCode.Should().Be(HttpStatusCode.OK, "we expect an HTTP 200 when calling PUT /api/products/{id} with valid data to update a product");
        var resultDto = await httpResponse.Content.ReadAsJsonAsync<ProductDto>();
        resultDto.Should().BeEquivalentTo(request, "We expect the update product endpoint to return the result");

        var getByIdResult = await webClient.GetAsync($"/api/products/{request.Id}");
        getByIdResult.StatusCode.Should().Be(HttpStatusCode.OK, "we should be able to get the updated product by id");
        var dtoById = await getByIdResult.Content.ReadAsJsonAsync<ProductDto>();
        dtoById.Should().BeEquivalentTo(request, "we expect the same result to be returned by a update product as what you'd get from get product by id");

        var getAllRequest = await webClient.GetAsync("/api/products");
        await AssertProductListAllFunctions(getAllRequest);

        var listAllData = await getAllRequest.Content.ReadAsJsonAsync<List<ProductDto>>();
        Assert.IsNotNull(listAllData, "We expect json data when calling GET /api/products");
        listAllData.Should().NotBeEmpty("list all should have something if we just updated a product");
        var matchingItem = listAllData.Where(x => x.Id == request.Id).ToArray();
        matchingItem.Should().HaveCount(1, "we should be a be able to find the newly created product by id in the list all endpoint");
        matchingItem[0].Should().BeEquivalentTo(request, "we expect the same result to be returned by a updated product as what you'd get from get getting all products");
    }

    internal static async Task<ProductDto> AssertCreateProductFunctions(this HttpResponseMessage httpResponse, ProductDto request, HttpClient webClient)
    {
        httpResponse.StatusCode.Should().Be(HttpStatusCode.Created, "we expect an HTTP 201 when calling POST /api/products with valid data to create a new product");

        var resultDto = await httpResponse.Content.ReadAsJsonAsync<ProductDto>();
        Assert.IsNotNull(resultDto, "We expect json data when calling POST /api/products");

        resultDto.Id.Should().BeGreaterOrEqualTo(1, "we expect a newly created product to return with a positive Id");
        resultDto.Should().BeEquivalentTo(request, x => x.Excluding(y => y.Id), "We expect the create product endpoint to return the result");

        httpResponse.Headers.Location.Should().NotBeNull("we expect the 'location' header to be set as part of a HTTP 201");
        httpResponse.Headers.Location.Should().Be($"http://localhost/api/products/{resultDto.Id}", "we expect the location header to point to the get product by id endpoint");

        var getByIdResult = await webClient.GetAsync($"/api/products/{resultDto.Id}");
        getByIdResult.StatusCode.Should().Be(HttpStatusCode.OK, "we should be able to get the newly created product by id");
        var dtoById = await getByIdResult.Content.ReadAsJsonAsync<ProductDto>();
        dtoById.Should().BeEquivalentTo(resultDto, "we expect the same result to be returned by a create product as what you'd get from get product by id");

        var getAllRequest = await webClient.GetAsync("/api/products");
        await AssertProductListAllFunctions(getAllRequest);

        var listAllData = await getAllRequest.Content.ReadAsJsonAsync<List<ProductDto>>();
        Assert.IsNotNull(listAllData, "We expect json data when calling GET /api/products");
        listAllData.Should().NotBeEmpty("list all should have something if we just created a product");
        var matchingItem = listAllData.Where(x => x.Id == resultDto.Id).ToArray();
        matchingItem.Should().HaveCount(1, "we should be a be able to find the newly created product by id in the list all endpoint");
        matchingItem[0].Should().BeEquivalentTo(resultDto, "we expect the same result to be returned by a created product as what you'd get from get getting all products");

        return resultDto;
    }

    internal static async Task<List<ProductDto>> AssertProductListAllFunctions(this HttpResponseMessage httpResponse)
    {
        httpResponse.StatusCode.Should().Be(HttpStatusCode.OK, "we expect an HTTP 200 when calling GET /api/products");
        var resultDto = await httpResponse.Content.ReadAsJsonAsync<List<ProductDto>>();
        Assert.IsNotNull(resultDto, "We expect json data when calling GET /api/products");
        resultDto.Should().HaveCountGreaterThan(2, "we expect at least 3 products");
        resultDto.All(x => !string.IsNullOrWhiteSpace(x.Name)).Should().BeTrue("we expect all products to have names");
        resultDto.All(x => !string.IsNullOrWhiteSpace(x.Description)).Should().BeTrue("we expect all products to have descriptions");
        resultDto.All(x => x.Id > 0).Should().BeTrue("we expect all products to have an id");
        var ids = resultDto.Select(x => x.Id).ToArray();
        ids.Should().HaveSameCount(ids.Distinct(), "we expect Id values to be unique for every product");
        return resultDto;
    }

    private sealed class DeleteProduct : IAsyncDisposable
    {
        private readonly ProductDto request;
        private readonly HttpClient webClient;

        public DeleteProduct(ProductDto request, HttpClient webClient)
        {
            this.request = request;
            this.webClient = webClient;
        }

        public async ValueTask DisposeAsync()
        {
            try
            {
                await webClient.DeleteAsync($"/api/products/{request.Id}");
            }
            catch (Exception)
            {
                // ignored
            }
        }
    }
}
