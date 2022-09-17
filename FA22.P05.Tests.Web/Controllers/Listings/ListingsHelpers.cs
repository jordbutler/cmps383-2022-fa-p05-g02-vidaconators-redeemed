using System.Net;
using FA22.P05.Tests.Web.Controllers.Authentication;
using FA22.P05.Tests.Web.Helpers;
using FA22.P05.Web.Features.Items;
using FA22.P05.Web.Features.Listings;
using FluentAssertions;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace FA22.P05.Tests.Web.Controllers.Listings;

internal static class ListingsHelpers
{
    internal static async Task<IAsyncDisposable?> CreateListing(this HttpClient webClient, ListingDto request)
    {
        try
        {
            await webClient.AssertLoggedInAsBob();
            var httpResponse = await webClient.PostAsJsonAsync("/api/listings", request);
            var resultDto = await AssertCreateListingFunctions(httpResponse, request, webClient);
            await webClient.AssertLoggedOut();
            request.Id = resultDto.Id;
            return new DeleteListing(resultDto, webClient);
        }
        catch (Exception)
        {
            return null;
        }
    }

    internal static async Task<ListingDto> AssertCreateListingFunctions(this HttpResponseMessage httpResponse, ListingDto request, HttpClient webClient)
    {
        httpResponse.StatusCode.Should().Be(HttpStatusCode.Created, "we expect an HTTP 201 when calling POST /api/listings with valid data to create a new listing");

        var resultDto = await httpResponse.Content.ReadAsJsonAsync<ListingDto>();
        Assert.IsNotNull(resultDto, "We expect json data when calling POST /api/listings");

        resultDto.Id.Should().BeGreaterOrEqualTo(1, "we expect a newly created listing to return with a positive Id");
        resultDto.Should().BeEquivalentTo(request, x => x.Excluding(y => y.Id), "We expect the create listing endpoint to return the result");

        httpResponse.Headers.Location.Should().NotBeNull("we expect the 'location' header to be set as part of a HTTP 201");
        httpResponse.Headers.Location.Should().Be($"http://localhost/api/listings/{resultDto.Id}", "we expect the location header to point to the get listing by id endpoint");

        var getByIdResult = await webClient.GetAsync($"/api/listings/{resultDto.Id}");
        getByIdResult.StatusCode.Should().Be(HttpStatusCode.OK, "we should be able to get the newly created listing by id as GET /api/listings/{id}");
        var dtoById = await getByIdResult.Content.ReadAsJsonAsync<ListingDto>();
        dtoById.Should().BeEquivalentTo(resultDto, "we expect the same result to be returned by a create listing as what you'd get from get listing by id");

        if (request.StartUtc <= DateTimeOffset.UtcNow && DateTimeOffset.UtcNow <= request.EndUtc)
        {
            var getAllRequest = await webClient.GetAsync("/api/listings/active");

            var listAllData = await getAllRequest.Content.ReadAsJsonAsync<List<ListingDto>>();
            Assert.IsNotNull(listAllData, "We expect json data when calling GET /api/listings/active");
            var matchingItem = listAllData.Where(x => x.Id == resultDto.Id).ToArray();
            matchingItem.Should().HaveCount(1, "we should be a be able to find this newly created listing by id in the list all endpoint as it was created while being active");
            matchingItem[0].Should().BeEquivalentTo(resultDto, "we expect the same result from get all active listings compared to a create listing");
        }

        return resultDto;
    }

    internal static async Task AssertSetListingItemsFunctions(this HttpResponseMessage httpResponse, List<ItemDto> items, ListingDto listingDto, HttpClient webClient)
    {
        httpResponse.StatusCode.Should().Be(HttpStatusCode.NoContent, "we expect an HTTP 204 when calling PUT /api/listings/{id}/item with valid data to set the listing items");

        var getListingItems = await webClient.GetAsync($"/api/listings/{listingDto.Id}/items");
        getListingItems.StatusCode.Should().Be(HttpStatusCode.OK, "we should get back a list (even if it is empty) of the listing items for sale when calling GET /api/listings/{id}/items");
        var listingItems = await getListingItems.Content.ReadAsJsonAsync<List<ItemDto>>();
        Assert.IsNotNull(listingItems, "we should get back a list (even if it is empty) of the listing items for sale when calling GET /api/listings/{id}/items");

        listingItems.Should().HaveCount(items.Count, "counts should match calling GET /api/listings/{id}/items after setting the items for sale via PUT /api/listings/{id}/items");
        foreach (var itemDto in items)
        {
            listingItems.Should().Contain(x => x.Id == itemDto.Id, "GET /api/listings/{id}/items should return the set of items marked for sale in the provided listing id");
        }

        if (listingDto.StartUtc <= DateTimeOffset.UtcNow && DateTimeOffset.UtcNow <= listingDto.EndUtc)
        {
            foreach (var itemDto in listingItems)
            {
                var getProductListing = await webClient.GetAsync($"/api/products/{itemDto.ProductId}/listings");
                var productListingData = await getProductListing.Content.ReadAsJsonAsync<List<ListingDto>>();
                Assert.IsNotNull(productListingData, "we expect json data when calling GET /api/products/{id}/listings");

                productListingData.Should().ContainEquivalentOf(listingDto, "we expect that an active listing with some item has a relevant product listing under GET /api/products/{id}/listings");

                if (productListingData.GroupBy(x => x.Id).Any(x => x.Count() > 1))
                {
                    Assert.Fail("Your GET /api/products/{id}/listings endpoint is returning the same ListingDto more than once");
                }
            }
        }
    }

    private class DeleteListing : IAsyncDisposable
    {
        private readonly ListingDto request;
        private readonly HttpClient webClient;

        public DeleteListing(ListingDto request, HttpClient webClient)
        {
            this.request = request;
            this.webClient = webClient;
        }

        public async ValueTask DisposeAsync()
        {
            try
            {
                await webClient.DeleteAsync($"/api/listings/{request.Id}");
            }
            catch (Exception)
            {
                // ignored
            }
        }
    }
}
