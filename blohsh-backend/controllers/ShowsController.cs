using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace blohsh_backend.Controllers
{
    [ApiController]
    [Route("api/shows")]
    public class ShowsController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetShows()
        {
            var json = System.IO.File.ReadAllText("data/shows.json");
            var parsed = JsonSerializer.Deserialize<object>(json);
            return Ok(parsed);
        }
    }
}
