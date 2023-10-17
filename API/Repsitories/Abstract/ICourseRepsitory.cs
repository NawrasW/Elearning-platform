using API.Models.Domain;
using API.Models.DTOs;

namespace API.Repsitories.Abstract
{
    public interface ICourseRepsitory
    {

       Task<CourseDto>  GetById(int id);
       
       Task<List <CourseDto>> GetAll();
     
       Task<bool> AddUpdate(CourseDto course);
      
       Task<bool> Delete(int Id);

       Task<List<CourseDto>> GetCoursesByDepartmentId(int DepartmentId);
    }
}
