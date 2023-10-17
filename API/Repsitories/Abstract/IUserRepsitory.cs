using API.Models.DTOs;

namespace API.Repsitories.Abstract
{
    public interface IUserRepsitory
    {
        //bool AddUpdateUser()

        Task<bool> AddUpdateUser(UserDto user);

        Task< List<UserDto>> GetAllUser();

        Task<bool> DeleteUser(int id);

       Task <UserDto> GetUserById(int id);

        Task<UserLoginResponseDto> GetLoginUser(UserLoginReqDto user);


        Task<List<TeamDto>> GetTeam();
    }
}
