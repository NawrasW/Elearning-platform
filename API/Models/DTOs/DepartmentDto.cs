namespace API.Models.DTOs
{
    public class DepartmentDto
    {
        public int Id { get; set; }

        public string Name { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;


        public string? IconClass { get; set; } = string.Empty;
    }



    public class DepartmenLookuptDto
    {
        public int Id { get; set; }

        public string Name { get; set; } = string.Empty;

        
    }
}
