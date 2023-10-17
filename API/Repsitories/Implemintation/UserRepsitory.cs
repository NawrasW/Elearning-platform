using API.Constans;
using API.Models.Domain;
using API.Models.DTOs;
using API.Repsitories.Abstract;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualBasic;
using API.ConstantEnum;
using Constants = API.Constans.Constants;

namespace API.Repsitories.Implemintation
{
    public class UserRepsitory: IUserRepsitory
    {
        private readonly DatabaseContext _db;

        private readonly IMapper _mapper;

        public UserRepsitory(DatabaseContext db, IMapper mapper)
        {
            _db = db;
            _mapper = mapper;
        }
        public async Task< bool> AddUpdateUser(UserDto userdto)
        {
            try
            {
                //User userObj = new User(userdto.Id, userdto.FirstName, userdto.LastName, userdto.Email, userdto.Password,
                //    userdto.NationalNumber, userdto.PhoneNumber, userdto.DateOfBirth, userdto.Username, userdto.Gender);
                //User user = new User
                //{
                //    Id = userdto.Id,
                //    NationalNumber = userdto.NationalNumber,
                //    FirstName = userdto.FirstName,
                //    LastName = userdto.LastName,
                //    Email = userdto.Email,
                //    PhoneNumber = userdto.PhoneNumber,
                //    DateOfBirth = userdto.DateOfBirth,
                //    Gender = userdto.Gender,
                //    Username = userdto.Username,
                //    Password = userdto.Password,
                //};



                User user = _mapper.Map<User>(userdto);

                if (user.Id == 0) {
                    
                  await  _db.Users.AddAsync(user);
                     }
                else
                {
                    
                    _db.Users.Update(user);
                }
                _db.SaveChanges();
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public async Task< bool> DeleteUser(int Id)
        {
            try 
            {
                var record = await _db.Users.FirstOrDefaultAsync(user => user.Id == Id);

                if (record == null) 
                    return false;
                
                _db.Users.Remove(record);
                _db.SaveChanges();
                return true;
            }

            catch (Exception ex) 
            {

                return false;

            }
        }

        public async Task< List<UserDto>> GetAllUser()
        {
            var result = await _db.Users.ToListAsync();
            var lstUserDto = _mapper.Map<List<UserDto>>(result);
            return lstUserDto;
        }



        public async Task<UserDto> GetUserById(int Id)
        {
            var result = await _db.Users.FirstOrDefaultAsync(user => user.Id == Id);
            //return _db.Users.Find(Id);
            UserDto user = _mapper.Map<UserDto>(result);
            return user;
        }

        public async Task<UserLoginResponseDto> GetLoginUser(UserLoginReqDto user)
        {
            var result = await _db.Users.FirstOrDefaultAsync(us => us.Username.ToLower() == user.Username /* && us.Password == user.Password*/);
            var userResult = new UserLoginResponseDto
            {
                Id = result.Id,
                FirstName = result.FirstName,
                LastName = result.LastName

            };
            
            return userResult;
        }

        public async Task<List<TeamDto>> GetTeam()
        {
            try { 
            var result = await _db.Users.Where(user=> user.Role.ToUpper()== Constants.Role.Admin 
            || user.Role.ToUpper() == Constants.Role.Teacher).Select(user => new TeamDto

            {
                Id =  user.Id,
                FirstName= user.FirstName,
                LastName= user.LastName,
                Email= user.Email,
                PhoneNumber= user.PhoneNumber,
                Role= user.Role,
                Experience= user.Experience,
                Twitter = user.Twitter,
                Facebook= user.Facebook,
                Instagram= user.Instagram,
                ImgName= user.ImgName,

            }).ToListAsync();
               return result;
               }
            catch(Exception ex)
            
            {
                return null;
            
            }


            }
    }
}
