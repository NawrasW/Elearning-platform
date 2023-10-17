using System.ComponentModel.DataAnnotations;

namespace API.Models.Domain
{
    public class User
    {
        public User() { }
        public User(int id, string? firstName, string? lastName,
           string? email, string? password, string? nationalNumber,
           string? phoneNumber, DateTime? dateOfBirth, string? username, string? gender)
        {
            Id = id;
            FirstName = firstName;
            LastName = lastName;
            Email = email;
            //Password = password;
            NationalNumber = nationalNumber;
            PhoneNumber = phoneNumber;
            DateOfBirth = dateOfBirth;
            Username = username;
            Gender = gender;
        }
        public int Id { get; set; }
        [Required]
        public string? FirstName { get; set; }
        [Required]
        public string? LastName { get; set; }
        [Required]
        public string? Email { get; set; }

        //public string? Password { get; set; }

        public byte[] Password { get; set; }
        public byte[] PasswordKey { get; set; }

        public string? NationalNumber { get; set; }

       
        public string? PhoneNumber { get; set; }

       
        public DateTime? DateOfBirth { get; set; }

        public string? Username { get; set; }

        
        public string? Gender { get; set; }


        public virtual List<UserDepartment>? UserDepartments { get; set; }

        public virtual List<Section>? Sections { get; set; } 
        //Admin Teacher Student
        public string?  Role { get; set; }


        public string? Token { get; set; }

        public string? Experience { get; set; }


        public string? Twitter { get; set; }


        public string? Facebook { get; set; }


        public string? Instagram { get; set; }



        public string? ImgName { get; set; }



    }
}
