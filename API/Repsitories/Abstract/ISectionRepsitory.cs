

using API.Models.DTOs;

namespace API.Repsitories.Abstract
{
    public interface ISectionRepsitory
    {
        Task<SectionDto> GetById(int id);

        Task<List<SectionDto>> GetAll();

        Task<bool> AddUpdate(SectionAddUpdateDto section);

        Task<bool> Delete(int Id);

        Task<List<SectionDto>> GetSectionByCourseId(int courseId);

        //Task<List<CourseDto>> GetCoursesByDepartmentId(int DepartmentId);



    }
}
