﻿using System;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using userWebApi.Services;

namespace userWebApi.Controllers
{
    [EnableCors]
    [ApiController]
    [Route("user")]
    public class UserController : ControllerBase
    {
        private IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [EnableCors]
        [HttpGet]
        public IActionResult GetAll()
        {
            var users = _userService.GetAllUsers();
            return Ok(users);
        }

        [EnableCors]
        [HttpGet("search/{field}")]
        [SwaggerOperation(Tags = new[] { "Search Users" })]
        public IActionResult SearchUsers(string field)
        {   
            var users = _userService.SearchUsers(field);
            return Ok(users);   
        }

    
        [EnableCors]
        [HttpPost]
        public IActionResult Create(User model)
        {
            _userService.Create(model);
            return Ok(new { message = "User created" });
        }

        [EnableCors]
        [HttpPut("{username}")]
        public IActionResult Update(User model)
        {
            _userService.Update( model);
            return Ok(new { message = "User updated" });
        }

        [EnableCors]
        [HttpDelete("{username}")]
        public IActionResult DeleteUser(string username)
        {
            _userService.Delete(username);
            return Ok(new { message = "User deleted" });
        }
    }
}
