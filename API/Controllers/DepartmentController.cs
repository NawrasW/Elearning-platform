using API.Models.Domain;
using API.Models.DTOs;
using API.Repsitories.Abstract;
using API.Repsitories.Implemintation;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentController : ControllerBase
    {
        private readonly IDepartmentRepsitory _departmentRepsitory;
        public DepartmentController(IDepartmentRepsitory repository) {

            _departmentRepsitory = repository;
        }

        [HttpGet("getAll")]
        public async Task<IActionResult> GetAll()

        {
            var result = await _departmentRepsitory.GetAllDepartment();
            return Ok(result);
        }

        [HttpGet("getAllDepartmentLookup")]
        public async Task<IActionResult> GetAllDepartmentLookup()

        {
            var result = await _departmentRepsitory.GetAllDepartmentLookup();
            return Ok(result);
        }

            [HttpGet("getById/{id}")]

        public async Task<IActionResult> GetById(int id)
        {

            var result =  await _departmentRepsitory.GetDepartmentById(id);
            return Ok(result);

        }

        [HttpPost("AddUpdate")]

        public async Task<IActionResult> AddUpdate(Department department)
        {
            var result = await _departmentRepsitory.AddUpdateDepartment(department);
            var status = new Status
            {

                StatusCode = result ? 1 : 0,
                StatusMessage = result ? "Saved Department Successfully" : "Error Updating......."


            };
            return Ok(status);
        }


        [HttpDelete("delete/{id}")]  
        public async Task<IActionResult> DeleteUser(int id)
        {
            var result = await _departmentRepsitory.DeleteDepartment(id);
            var status = new Status
            {
                StatusCode = result ? 1 : 0,
                StatusMessage = result ? "Deleted Department Successfully" : "Error Deleting......"

            };
            return Ok(status);
        }


        [HttpGet("getDepartments")]

        public async Task<IActionResult> GetDepartmentLookup()
        {

            var result = await _departmentRepsitory.GetDepartments();
            return Ok(result);

        }



    }
}
