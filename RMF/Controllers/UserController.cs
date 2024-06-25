using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RMF.DataDB;
using RMF.Models;

namespace RMF.Controllers
{
    public class UserController : ControllerBase
    {

        public readonly RmfContext database;
        public readonly DbSet<User> dBSet;
        public UserController(RmfContext database)
        {
            this.database = database;
            this.dBSet = this.database.Set<User>();
            this.database.Database.EnsureCreated();
        }

        [HttpGet]
        [Route("user/getEmail")]
        public List<User> GetValue()
        {
            
            var ans = this.dBSet.ToList();
            
            return ans;
        }
        [HttpGet]
        [Route("user/login")]
        public async Task<ActionResult<LoginOutput>> GetLoginDetails(Login detail)
        {
           var user = await this.dBSet.FindAsync(detail.Email);
            LoginOutput output = new LoginOutput();
            if (user == null)
            {
                return BadRequest("Email Doesnot exist");
            }
            if (user?.Password != detail.Password)
            {
                return BadRequest("Password Doesnt match");
            }
            output.Name = user.Name;
            output.UserType =   user.UserType;
            return Ok(output);
        }
        [HttpPost]
        [Route("user/signUp")]
        public async Task<IActionResult> PostUser(User user)
        {
            this.dBSet.Add(user);
            await this.database.SaveChangesAsync();
            return Ok(user);
        }
    }
}
