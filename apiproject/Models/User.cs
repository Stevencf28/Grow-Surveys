using System;
using System.Collections.Generic;

#nullable disable

namespace apiproject.Models
{
    public partial class User
    {
        public User()
        {
            Answers = new HashSet<Answer>();
            Surveys = new HashSet<Survey>();
        }

        public int UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string UserType { get; set; }

        public virtual ICollection<Answer> Answers { get; set; }
        public virtual ICollection<Survey> Surveys { get; set; }
    }
}
