using FA22.P05.Web.Features.Authorization;
using FA22.P05.Web.Features.ItemListings;
using FA22.P05.Web.Features.Items;
using FA22.P05.Web.Features.Listings;
using FA22.P05.Web.Features.Products;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace FA22.P05.Web.Data;

public static class MigrateAndSeed
{
    public static async Task Initialize(IServiceProvider services)
    {
        var context = services.GetRequiredService<DataContext>();
        await context.Database.MigrateAsync();

        AddProducts(context);
       // AddItems(context);
       

        await AddRoles(services);
        await AddUsers(services);
        await AddListings(context);
        
    }

    private static async Task AddListings(DataContext context)
    {
        var listings = context.Set<Listing>();
        if(listings.Any())
        {
            return;
        }

        listings.Add(new Listing
        {
            Catagory = "Console",

            Language = "English",

            Name = "Nintendo Listing",

            Country = "UK",

            Description = "Nintendo Games",

            Owner = context.Set<User>().FirstOrDefault(),

            Price = 50.99m,

            Year = 2022,

            Publisher = "Nintendo",

            OwnerId = 1,

            StartUtc = DateTime.UtcNow,

            EndUtc = DateTimeOffset.MaxValue,

            Version = "N64",


            
            ItemsForSale = new List<ItemListing>
            {
                new ItemListing
                {

                    Item = new Item
                    {
                        
                        Condition = "Good",
                        Product = context.Set<Product>().FirstOrDefault(),
                        Owner = context.Set<User>().FirstOrDefault()
                        

                    }

                },


                new ItemListing
                {
                    Item = new Item
                    {
                        Condition = "Brand New",
                        ProductId = 2,
                        Owner = context.Set<User>().FirstOrDefault(),
                    }
                }

            }
            
        });
        context.SaveChanges();
       
    }

    private static void AddProducts(DataContext context)
    {
        var products = context.Set<Product>();
        if (products.Any())
        {
            return;
        }

        products.Add(new Product
        {
            Name = "Super Mario World",
            Description = "Super Nintendo (SNES) System",
        });
        products.Add(new Product
        {
            Name = "Donkey Kong 64",
            Description = "Donkey Kong 64 cartridge for the Nintendo 64",
        });
        products.Add(new Product
        {
            
            Name = "Half-Life 2: Collector's Edition",
            Description = "PC platform release of the 2004 wonder",
        });
        context.SaveChanges();
    }
    

    public static void AddItems(DataContext context)
    {
        var items = context.Set<Item>();
        if (items.Any())
        {
            return;
        }
        items.Add(new Item
        {
            Product = context.Set<Product>().FirstOrDefault(),
            Owner = context.Set<User>().FirstOrDefault(),
            Condition = "Poor",
            
        }) ;

        items.Add(new Item
        {
            Product = context.Set<Product>().FirstOrDefault(),
            Owner = context.Set<User>().FirstOrDefault(),
            Condition = "Good",
        });
        context.SaveChanges();
    }

    private static async Task AddUsers(IServiceProvider services)
    {
        const string defaultPassword = "Password123!";

        var userManager = services.GetRequiredService<UserManager<User>>();
        if (userManager.Users.Any())
        {
            return;
        }

        var adminUser = new User
        {
            UserName = "galkadi"
        };
        await userManager.CreateAsync(adminUser, defaultPassword);
        await userManager.AddToRoleAsync(adminUser, RoleNames.Admin);

        var bobUser = new User
        {
            UserName = "bob"
        };
        await userManager.CreateAsync(bobUser, defaultPassword);
        await userManager.AddToRoleAsync(bobUser, RoleNames.User);

        var sueUser = new User
        {
            UserName = "sue"
        };
        await userManager.CreateAsync(sueUser, defaultPassword);
        await userManager.AddToRoleAsync(sueUser, RoleNames.User);
    }

    private static async Task AddRoles(IServiceProvider services)
    {
        var roleManager = services.GetRequiredService<RoleManager<Role>>();
        if (roleManager.Roles.Any())
        {
            return;
        }

        await roleManager.CreateAsync(new Role
        {
            Name = RoleNames.Admin
        });

        await roleManager.CreateAsync(new Role
        {
            Name = RoleNames.User
        });
    }
}
