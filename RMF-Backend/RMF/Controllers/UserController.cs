using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MongoDB.Bson;
using MongoDB.Driver;
using RMF.DataDB;
using RMF.Models;
using RMF.Services;

namespace RMF.Controllers
{
    public class UserController : ControllerBase
    {

        public readonly RmfContext database;
        public readonly DbSet<User> dBSet;
        public readonly IConfiguration configuration;
        public UserController(RmfContext database)
        {
            this.database = database;
            this.dBSet = this.database.Set<User>();
            this.database.Database.EnsureCreated();
        }
        
        [HttpGet]
        [Route("user/getEmail")]
        public List<AdminDetail> GetValue()
        {
            
            var users = this.dBSet.ToList();
            var ans = new List<AdminDetail>();
            
            foreach (var user in users)
            {
                var detail = new AdminDetail();
                detail.Name = user.Name;
                detail.UserType = user.UserType;
                detail.Email = user.Email;
                ans.Add(detail);
            }
            
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
            if (this.dBSet.Find(user.Email) != null)
            {
                return BadRequest("Email Already Exist");
            }
            this.dBSet.Add(user);
            await this.database.SaveChangesAsync();
            return Ok(user);
        }
        [HttpDelete]
        [Route("user/delete")]
        public async Task<IActionResult> DeleteUser(string email)
        {
            var user = await this.dBSet.FindAsync(email);
            if (user == null)
            {
                return NotFound();
            }
            this.dBSet.Remove(user);
            await this.database.SaveChangesAsync();
            return Ok();

        }
    }
}
