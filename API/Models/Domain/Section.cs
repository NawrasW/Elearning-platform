namespace API.Models.Domain
{
    public class Section
    {
        public int Id { get; set; }
            
        public string Name { get; set; } = string.Empty;

        public virtual Course? Course { get; set; } 

        public virtual int CourseId { get; set; }

        public virtual User? Teacher { get; set; } 

        public virtual int TeacherId { get; set; }

        public int? TimeFrom { get; set; }

        public int? TimeTo { get; set; }

        public int TotalHours { get; set; }

        public int LecturesPerWeek { get; set; }





        //number of hours 80h
    }
}
