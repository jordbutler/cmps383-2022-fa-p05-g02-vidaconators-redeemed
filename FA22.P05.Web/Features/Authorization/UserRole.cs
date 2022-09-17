using Microsoft.AspNetCore.Identity;

namespace FA22.P05.Web.Features.Authorization;

public class UserRole : IdentityUserRole<int>
{
    public virtual Role? Role { get; set; }
    public virtual User? User { get; set; }
}
