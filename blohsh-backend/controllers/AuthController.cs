using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using BCrypt.Net;

namespace blohsh_backend.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly string _connectionString = "server=localhost;user=root;password=nastia!2006;database=blohsh";

        [HttpPost("signup")]
        public IActionResult Signup([FromBody] User user)
        {
            var hash = BCrypt.Net.BCrypt.HashPassword(user.PasswordHash);

            using var conn = new MySqlConnection(_connectionString);
            conn.Open();

            var cmd = new MySqlCommand("INSERT INTO users (username, password_hash) VALUES (@username, @hash)", conn);
            cmd.Parameters.AddWithValue("@username", user.Username);
            cmd.Parameters.AddWithValue("@hash", hash);
            cmd.ExecuteNonQuery();

            return Ok(new { user.Username });
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] User user)
        {
            using var conn = new MySqlConnection(_connectionString);
            conn.Open();

            var cmd = new MySqlCommand("SELECT * FROM users WHERE username = @username", conn);
            cmd.Parameters.AddWithValue("@username", user.Username);

            using var reader = cmd.ExecuteReader();
            if (!reader.Read()) return BadRequest(new { error = "Invalid credentials" });

            var hash = reader.GetString("password_hash");
            var id = reader.GetInt32("id");
            var role = reader.GetString("role");

            if (!BCrypt.Net.BCrypt.Verify(user.PasswordHash, hash))
                return BadRequest(new { error = "Invalid credentials" });

            return Ok(new { id, username = user.Username, role });
        }
    }

    public class User
    {
        public string Username { get; set; }
        public string PasswordHash { get; set; }
    }
}
