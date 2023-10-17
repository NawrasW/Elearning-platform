using API.Models.DTOs;
using API.Repsitories.Abstract;
using API.Repsitories.Implemintation;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SectionController : ControllerBase
    {

        private readonly ISectionRepsitory _sectionRepsitory;
        public SectionController(ISectionRepsitory sectionRepsitory)
        {

            _sectionRepsitory = sectionRepsitory;
        }


        [HttpGet("getById/{id}")]

        public async Task<IActionResult> GetById(int id)
        {

            var result = await _sectionRepsitory.GetById(id);
            if (result == null)
            {
                var status = new Status
                {
                    StatusCode = 0,
                    StatusMessage = "Section Not Found"

                };
                return Ok(status);


            }
            return Ok(result);

        }


        [HttpGet("getAll")]
        public async Task<IActionResult> GetAll()

        {
            var result = await _sectionRepsitory.GetAll();
            return Ok(result);
        }



        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await _sectionRepsitory.Delete(id);
            var status = new Status
            {
                StatusCode = result ? 1 : 0,
                StatusMessage = result ? "Deleted Section Successfully" : "Error Deleting......"

            };
            return Ok(status);
        }



        [HttpPost("addSection")]

        public async Task<IActionResult> AddSection(SectionAddUpdateDto section)
        {
            var result = await _sectionRepsitory.AddUpdate(section);
            var status = new Status
            {

                StatusCode = result ? 1 : 0,
                StatusMessage = result ? "Added Successfully" : "Error adding......."


            };
            return Ok(status);
        }



        [HttpPut("updateSection")]

        public async Task<IActionResult> UpdateSection(SectionAddUpdateDto section)
        {
            var result = await _sectionRepsitory.AddUpdate(section);
            var status = new Status
            {

                StatusCode = result ? 1 : 0,
                StatusMessage = result ? "Updated Successfully" : "Error Updating......."


            };
            return Ok(status);
        }





        [HttpGet("getSectionByCourseId/{courseId}")]
        public async Task<IActionResult> getSectionByCourseId(int courseId)
        {

            var result = await _sectionRepsitory.GetSectionByCourseId(courseId);
            
            return Ok(result);

        }
    }
}
