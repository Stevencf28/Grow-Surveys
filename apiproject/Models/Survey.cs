﻿using System;
using System.Collections.Generic;

namespace apiproject.Models
{
    public partial class Survey
    {
        public int SurveyId { get; set; }

        public int UserId { get; set; }
        public string Title { get; set; }
        public string Q1 { get; set; }
        public string Q2 { get; set; }
        public string Q3 { get; set; }
    }
}
