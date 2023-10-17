
using API.Models.DTOs;

namespace API.Repsitories.Abstract
{
    public interface IAuthRepsitory
    {
     Task <UserLoginDto> Login(UserForLoginDto userDto);

      Task<bool> Register(UserDto userDto);


        Task<bool> UserAlreadyExists(string userName);
    }
}
