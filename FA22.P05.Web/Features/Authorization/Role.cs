using Microsoft.AspNetCore.Identity;

namespace FA22.P05.Web.Features.Authorization;

public class Role : IdentityRole<int>
{
    public virtual ICollection<UserRole> Users { get; set; } = new List<UserRole>();
}