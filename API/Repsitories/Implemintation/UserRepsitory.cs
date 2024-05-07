using API.Constans;
using API.Models.Domain;
using API.Models.DTOs;
using API.Repsitories.Abstract;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualBasic;
using API.ConstantEnum;
using Constants = API.Constans.Constants;
using System.Security.Cryptography;
using System.Text;
using System.Reflection;

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
        public async Task<bool> AddUpdateUser(UserDto userDto)
        {
            try
            {
                Console.WriteLine("Entering AddUpdateUser method...");

                User user;

                if (userDto.Id == 0)
                {
                    Console.WriteLine("Adding a new user...");

                    // Create a new user entity and manually set properties
                    user = new User
                    {
                        FirstName = userDto.FirstName,
                        LastName = userDto.LastName,
                        Email = userDto.Email,
                        PhoneNumber = userDto.PhoneNumber,
                        DateOfBirth = userDto.DateOfBirth,
                        Gender = userDto.Gender,
                        NationalNumber = userDto.NationalNumber,
                        Username = userDto.Username
                    };

                    // Hash the password before saving it
                    if (!string.IsNullOrEmpty(userDto.Password))
                    {
                        HashPassword(userDto.Password, out byte[] passwordKey, out byte[] passwordHash);
                        user.PasswordKey = passwordKey;
                        user.Password = passwordHash;
                    }

                    await _db.Users.AddAsync(user);
                }
                else
                {
                    Console.WriteLine($"Updating user with ID: {userDto.Id}...");

                    // Retrieve the existing user
                    user = await _db.Users.FindAsync(userDto.Id);

                    if (user != null)
                    {
                        // Manually update properties
                        user.FirstName = userDto.FirstName;
                        user.LastName = userDto.LastName;
                        user.Email = userDto.Email;
                        user.PhoneNumber = userDto.PhoneNumber;
                        user.DateOfBirth = userDto.DateOfBirth;
                        user.Gender = userDto.Gender;
                        user.NationalNumber = userDto.NationalNumber;
                        user.Username = userDto.Username;

                        // Check if a new password is provided
                        if (!string.IsNullOrEmpty(userDto.Password))
                        {
                            Console.WriteLine($"Updating user password for user with ID: {user.Id}...");

                            // Hash the new password before updating it
                            HashPassword(userDto.Password, out byte[] newPasswordKey, out byte[] newPasswordHash);
                            user.PasswordKey = newPasswordKey;
                            user.Password = newPasswordHash;
                        }
                    }
                    else
                    {
                        Console.WriteLine($"User with ID {userDto.Id} not found.");
                        return false;
                    }
                }

                Console.WriteLine("Saving changes to the database...");
                await _db.SaveChangesAsync();

                Console.WriteLine("Changes saved successfully.");

                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in AddUpdateUser: {ex.Message}");
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
        private void HashPassword(string password, out byte[] passwordKey, out byte[] passwordHash)
        {
            using (var hmac = new HMACSHA512())
            {
                passwordKey = hmac.Key;
                passwordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
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