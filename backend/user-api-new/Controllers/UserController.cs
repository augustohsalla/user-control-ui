using System;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using user_api_new.Services;

namespace userWebApi.Controllers
{
    [EnableCors]
    [ApiController]
    [Route("user")]
    public class UserController : ControllerBase
    {
        private IUserInterface _userService;

        public UserController(IUserInterface userService)
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
        [HttpPost("search")]
        public async Task<IActionResult> SearchUsers([FromBody] string field)
        {   
            var users = await _userService.SearchUsers(field);
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
