using System;
using System.Collections.Generic;

#nullable disable

namespace apiproject.Models
{
    public partial class Survey
    {
        public int SurveyId { get; set; }
        public string Title { get; set; }
        public bool Active { get; set; }
        public int UserId { get; set; }

        public virtual User User { get; set; }
    }
}
