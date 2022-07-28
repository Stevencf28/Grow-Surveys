using System;
using System.Collections.Generic;

#nullable disable

namespace apiproject.Models
{
    public partial class Answer
    {
        public int AnswerId { get; set; }
        public int UserId { get; set; }
        public string Text { get; set; }

        public virtual User User { get; set; }
    }
}
