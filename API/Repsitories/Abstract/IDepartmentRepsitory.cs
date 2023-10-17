using API.Models.Domain;
using API.Models.DTOs;

namespace API.Repsitories.Abstract
{
    public interface IDepartmentRepsitory
    {

    public Task < DepartmentDto> GetDepartmentById(int Id);
    public  Task< bool> AddUpdateDepartment(Department user);
            
    public  Task< List<DepartmentDto>> GetAllDepartment();


    public Task<List<DepartmenLookuptDto>> GetAllDepartmentLookup();

     public  Task< bool> DeleteDepartment(int Id);

        Task <List<Department>> GetDepartments();


    }
}
