using API.Models.Domain;
using API.Models.DTOs;
using API.Repsitories.Abstract;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;

namespace API.Repsitories.Implemintation
{
    public class AuthRepsitory : IAuthRepsitory
    {

        private readonly DatabaseContext _db;
        private readonly IMapper _mapper;
        

        public AuthRepsitory(DatabaseContext db, IMapper mapper)
        {
            _db = db;
            _mapper = mapper;
        }

        public async Task<UserLoginDto> Login(UserForLoginDto userDto)
        {
            try
            {
                var user = await _db.Users.FirstOrDefaultAsync(user =>
                    user.Username.ToLower() == userDto.UserName.ToLower());

                if (user == null || user.Password == null || user.PasswordKey == null)
                    return null;

                if (!MatchPasswordHash(userDto.Password, user.Password, user.PasswordKey))
                    return null;

                var result = new UserLoginDto
                {
                    Id = user.Id,
                    UserName = user.Username,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    Role = user.Role
                };

                return result;
            }
            catch (Exception ex)
            {
                // Log the exception or handle it appropriately
                throw;
            }
        }



        public async Task<bool> Register(UserDto userDto)
        {
            byte[] passwordkey, passwordHash;
            using (var hmac = new HMACSHA512()) {

                passwordkey = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(userDto.Password));


            }
            User user = new User
            {

                Id = userDto.Id,
                NationalNumber = userDto.NationalNumber,
                FirstName = userDto.FirstName,
                LastName = userDto.LastName,
                Email = userDto.Email,
                PhoneNumber = userDto.PhoneNumber,
                DateOfBirth = userDto.DateOfBirth,
                Gender = userDto.Gender,
                Username = userDto.Username,
                //Password = userDto.Password,
            };

            user.Password = passwordHash;
            user.PasswordKey = passwordkey;
            await _db.Users.AddAsync(user);

            _db.SaveChanges();
            return true;
        }

        public async Task<bool> UserAlreadyExists(string userName)
        {
            return await _db.Users.AnyAsync(user => user.Username == userName);
        }


        private bool MatchPasswordHash(string passwordText, byte[] storedHash, byte[] passwordKey)
        {
            using (var hmac = new HMACSHA512(passwordKey))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(passwordText));
                for (int i = 0; i < computedHash.Length; i++)
                {
                    if (computedHash[i] != storedHash[i])
                        return false;
                }
            }
            return true;
        }
    }
}
