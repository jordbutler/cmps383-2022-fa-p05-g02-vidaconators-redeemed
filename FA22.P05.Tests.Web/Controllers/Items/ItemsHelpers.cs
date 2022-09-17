using System.Net;
using FA22.P05.Tests.Web.Controllers.Authentication;
using FA22.P05.Tests.Web.Helpers;
using FA22.P05.Web.Features.Items;
using FluentAssertions;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace FA22.P05.Tests.Web.Controllers.Items;

internal static class ItemsHelpers
{
    internal static async Task<IAsyncDisposable?> CreateItem(this HttpClient webClient, ItemDto request)
    {
        try
        {
            await webClient.AssertLoggedInAsBob();
            var httpResponse = await webClient.PostAsJsonAsync("/api/items", request);
            var resultDto = await AssertCreateItemFunctions(httpResponse, request, webClient);
            await webClient.AssertLoggedOut();
            request.Id = resultDto.Id;
            request.ProductName = resultDto.ProductName;
            return new DeleteItem(resultDto, webClient);
        }
        catch (Exception)
        {
            return null;
        }
    }

    internal static async Task<ItemDto> AssertCreateItemFunctions(this HttpResponseMessage httpResponse, ItemDto request, HttpClient webClient)
    {
        httpResponse.StatusCode.Should().Be(HttpStatusCode.Created, "we expect an HTTP 201 when calling POST /api/items with valid data to create a new item");

        var resultDto = await httpResponse.Content.ReadAsJsonAsync<ItemDto>();
        Assert.IsNotNull(resultDto, "We expect json data when calling POST /api/items");

        resultDto.Id.Should().BeGreaterOrEqualTo(1, "we expect a newly created item to return with a positive Id");
        resultDto.Should().BeEquivalentTo(request, x => x.Excluding(y => y.Id).Excluding(y => y.ProductName), "We expect the create item endpoint to return the result");

        httpResponse.Headers.Location.Should().NotBeNull("we expect the 'location' header to be set as part of a HTTP 201");
        httpResponse.Headers.Location.Should().Be($"http://localhost/api/items/{resultDto.Id}", "we expect the location header to point to the get item by id endpoint");

        var getByIdResult = await webClient.GetAsync($"/api/items/{resultDto.Id}");
        getByIdResult.StatusCode.Should().Be(HttpStatusCode.OK, "we should be able to get the newly created item by id");
        var dtoById = await getByIdResult.Content.ReadAsJsonAsync<ItemDto>();
        dtoById.Should().BeEquivalentTo(resultDto, "we expect the same result to be returned by a create item as what you'd get from get item by id");

        return resultDto;
    }

    internal static async Task AssertItemUpdateFunctions(this HttpResponseMessage httpResponse, ItemDto request, HttpClient webClient)
    {
        httpResponse.StatusCode.Should().Be(HttpStatusCode.OK, "we expect an HTTP 200 when calling PUT /api/items/{id} with valid data to update a item");
        var resultDto = await httpResponse.Content.ReadAsJsonAsync<ItemDto>();
        resultDto.Should().BeEquivalentTo(request, x => x.Excluding(y => y.ProductName), "We expect the update item endpoint to return the result");

        var getByIdResult = await webClient.GetAsync($"/api/items/{request.Id}");
        getByIdResult.StatusCode.Should().Be(HttpStatusCode.OK, "we should be able to get the updated item by id");
        var dtoById = await getByIdResult.Content.ReadAsJsonAsync<ItemDto>();
        dtoById.Should().BeEquivalentTo(request, "we expect the same result to be returned by a update item as what you'd get from get item by id");
    }

    private class DeleteItem : IAsyncDisposable
    {
        private readonly ItemDto request;
        private readonly HttpClient webClient;

        public DeleteItem(ItemDto request, HttpClient webClient)
        {
            this.request = request;
            this.webClient = webClient;
        }

        public async ValueTask DisposeAsync()
        {
            try
            {
                await webClient.DeleteAsync($"/api/items/{request.Id}");
            }
            catch (Exception)
            {
                // ignored
            }
        }
    }
}
