using API.Models.Domain;
using API.Models.DTOs;
using API.Repsitories.Abstract;
using API.Repsitories.Implemintation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{   
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class CourseController : ControllerBase
    {

        private readonly ICourseRepsitory _repsitory;

        public CourseController(ICourseRepsitory repsitory)
        {
            _repsitory = repsitory;
        }

        [HttpGet("getCourseById/{id}")]

        public async Task<IActionResult> GetCourseById(int id)
        {

            var result = await _repsitory.GetById(id);
            if (result == null)
            {
                var status = new Status
                {
                    StatusCode =  0,
                    StatusMessage =  "Course Not Found"

                };
                return Ok(status);


            }
            return Ok(result);  
        }
        [AllowAnonymous]
        [HttpGet("getAll")]
        public async Task<IActionResult> GetAllCourses()

        {
            var result = await _repsitory.GetAll();
            return Ok(result);
        }

        [HttpPost("addCourse")]

        public async Task<IActionResult> AddCourse(CourseDto course)
        {
            var result = await _repsitory.AddUpdate(course);
            var status = new Status
            {

                StatusCode = result ? 1 : 0,
                StatusMessage = result ? "Add Successfully" : "Error adding......."


            };
            return Ok(status);
        }

        [HttpPut("updateCourse")]

        public async Task<IActionResult> UpdateCourse(CourseDto course)
        {
            var result = await _repsitory.AddUpdate(course);
            var status = new Status
            {

                StatusCode = result ? 1 : 0,
                StatusMessage = result ? "Updated Successfully" : "Error Updating......."


            };
            return Ok(status);
        }


        [HttpDelete("deleteCourse/{id}")]   
        public async Task <IActionResult> DeleteCourse(int id)
        {
            var result = await _repsitory.Delete(id);
            var status = new Status
            {
                StatusCode = result ? 1 : 0,
                StatusMessage = result ? "Deleted Successfully" : "Error Deleting......"

            };
            return Ok(status);
        }



        [HttpGet("getCoursesByDepartmentId/{departmentId}")]
        public async Task<IActionResult> GetCoursesByDepartmentId(int departmentId)

        {
            var result = await _repsitory.GetCoursesByDepartmentId(departmentId);
            return Ok(result);
        }
    }
}
