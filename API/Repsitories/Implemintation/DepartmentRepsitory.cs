using API.Models.Domain;
using API.Models.DTOs;
using API.Repsitories.Abstract;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace API.Repsitories.Implemintation
{
    public class DepartmentRepsitory : IDepartmentRepsitory
    {

        private readonly DatabaseContext _db;


        public DepartmentRepsitory(DatabaseContext db)
        {
            _db = db;
        }
        public async Task< bool> AddUpdateDepartment(Department department)
        {
            try
            {
                if (department.Id == 0)
                {

                   await _db.Departments.AddAsync(department);
                }
                else
                {

                    _db.Departments.Update(department);
                }
               await _db.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public async Task<bool> DeleteDepartment(int Id)
        {
            try
            {
                var record = await _db.Departments.FirstOrDefaultAsync(dep => dep.Id == Id);

                if (record == null)
                    return false;
                _db.Departments.Remove(record);
               await _db.SaveChangesAsync();
                return true;
            }

            catch (Exception ex)
            {

                return false;

            }
        }

        public async Task<List<DepartmentDto>> GetAllDepartment()
        {
            List < DepartmentDto > result = await _db.Departments.Select(dep => new DepartmentDto
            {
                Id = dep.Id,
                Name = dep.Name,
                Description = dep.Description,
                IconClass = dep.IconClass,
            }).ToListAsync();
            return result;
           // return await _db.Departments.ToListAsync();
        }

        public async Task<List<DepartmenLookuptDto>> GetAllDepartmentLookup()
        {
            List<DepartmenLookuptDto> result = await _db.Departments.Select(dep => new DepartmenLookuptDto
            {
                Id = dep.Id,
                Name = dep.Name,
                
            }).ToListAsync();
            return result;
        }

        public async Task< DepartmentDto> GetDepartmentById(int Id)
        {
         var result= await _db.Departments.FirstOrDefaultAsync(dep => dep.Id == Id);
            if (result == null)
                return null;
            return new DepartmentDto {
                Id = result.Id,
                Name = result.Name,
                Description = result.Description,
                IconClass = result.IconClass,
            };
        }

        public async Task<List<Department>> GetDepartments()
        {
            var result1 = await _db.Departments.ToListAsync();

            //in order for these to work, you have to comment out some classes in the models. 
            //var result2 = await _db.Departments.Include(dep => dep.Courses).ToListAsync();
            //var result3 = await _db.Departments.Include(dep => dep.Courses).ThenInclude(co => co.Sections).ToListAsync();

            return result1;
        }
    }
}
