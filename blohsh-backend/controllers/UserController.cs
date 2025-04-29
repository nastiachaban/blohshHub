using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using System.Text.Json;

namespace blohsh_backend.Controllers
{
    [ApiController]
    [Route("api/users")]
    public class UsersController : ControllerBase
    {
        private readonly string _connectionString = "server=localhost;user=root;password=nastia!2006;database=blohsh";

        [HttpGet("stats/{username}")]
        public IActionResult GetStats(string username)
        {
            using var conn = new MySqlConnection(_connectionString);
            conn.Open();

            var cmd = new MySqlCommand("SELECT wordleWins, userRank FROM users WHERE username = @username", conn);
            cmd.Parameters.AddWithValue("@username", username);

            using var reader = cmd.ExecuteReader();
            if (reader.Read())
            {
                return Ok(new
                {
                    wordleWins = reader.GetInt32("wordleWins"),
                    userRank = reader.GetString("userRank")
                });
            }

            return NotFound(new { message = "User not found" });
        }

        [HttpPost("win")]
        public async Task<IActionResult> SaveWin([FromBody] JsonElement body)
        {
            if (!body.TryGetProperty("username", out var usernameElement))
                return BadRequest(new { message = "Username is required" });

            var username = usernameElement.GetString();
            if (string.IsNullOrEmpty(username))
                return BadRequest(new { message = "Username is empty" });

            using var conn = new MySqlConnection(_connectionString);
            await conn.OpenAsync();

            var updateWinsCmd = new MySqlCommand("UPDATE users SET wordleWins = wordleWins + 1 WHERE username = @username", conn);
            updateWinsCmd.Parameters.AddWithValue("@username", username);
            await updateWinsCmd.ExecuteNonQueryAsync();

            var selectWinsCmd = new MySqlCommand("SELECT wordleWins FROM users WHERE username = @username", conn);
            selectWinsCmd.Parameters.AddWithValue("@username", username);
            var winsObj = await selectWinsCmd.ExecuteScalarAsync();

            if (winsObj == null) return NotFound(new { message = "User not found" });

            int wins = Convert.ToInt32(winsObj);
            string newRank = CalculateRank(wins);

            var updateRankCmd = new MySqlCommand("UPDATE users SET userRank = @rank WHERE username = @username", conn);
            updateRankCmd.Parameters.AddWithValue("@rank", newRank);
            updateRankCmd.Parameters.AddWithValue("@username", username);
            await updateRankCmd.ExecuteNonQueryAsync();

            return Ok(new { message = "Win and rank updated successfully!", wins, newRank });
        }

        private string CalculateRank(int wins)
        {
            if (wins >= 150) return "Legend";
            if (wins >= 100) return "Master";
            if (wins >= 50) return "Expert";
            if (wins >= 30) return "Pro";
            if (wins >= 15) return "Intermediate";
            if (wins >= 5) return "Beginner";
            return "Newbie";
        }
    }
}
