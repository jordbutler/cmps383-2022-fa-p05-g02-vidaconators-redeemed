using Microsoft.AspNetCore.Identity;

namespace FA22.P05.Web.Features.Authorization;

public class User : IdentityUser<int>
{
    public virtual ICollection<UserRole> Roles { get; set; } = new List<UserRole>();
}