using Microsoft.AspNetCore.Mvc;
using RMF.DataDB;

namespace RMF.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly ILogger<WeatherForecastController> _logger;

        public WeatherForecastController(ILogger<WeatherForecastController> logger)
        {
            _logger = logger;
        }
        
       

        [HttpGet]
        [Route("user/getEmail")]
        public String GetValue()
        {
            String res = "abc";
            RmfContext context = new RmfContext();
            var and = context.Users.FirstOrDefault();
            res = and.Email;
            return res;
        }
        
    }
}
