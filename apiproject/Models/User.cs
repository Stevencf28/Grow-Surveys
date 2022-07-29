using System;
using System.Collections.Generic;

#nullable disable

namespace apiproject.Models
{
    public partial class User
    {
        public long UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string UserName { get; set; }
        public string Pass { get; set; }
        public string AccountType { get; set; }
    }
}
