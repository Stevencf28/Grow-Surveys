namespace apiproject.Models
{
    public partial class Answer
    {
        public int AnswerId { get; set; }
        public int SurveyId { get; set; }
        public int UserId { get; set; }
        public string Q1 { get; set; }
        public string Q2 { get; set; }
        public string Q3 { get; set; }
    }
}
