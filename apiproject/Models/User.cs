using System;
using System.Collections.Generic;

#nullable disable

namespace apiproject.Models
{
    public partial class User
    {
        public int UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string AccountType { get; set; }
    }
}
