using System;
using System.Collections.Generic;

namespace RMF.DataDB;

public partial class User
{
    public string Name { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string Password { get; set; } = null!;

    public string UserType { get; set; } = null!;
}
