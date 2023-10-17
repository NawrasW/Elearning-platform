﻿using API.Models.Domain;
using API.Models.DTOs;
using AutoMapper;

namespace API.Helper
{
    public class AutoMapperProfiles:Profile
    {

        public AutoMapperProfiles()
        {
            CreateMap<User, UserDto>().ReverseMap();
            //CreateMap<UserDto, User>();

        }

    }
}
