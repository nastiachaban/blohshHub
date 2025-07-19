using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using System.Text.Json;

namespace blohsh_backend.Controllers
{
    [ApiController]
    [Route("api/favourites")]
    public class FavouritesController : ControllerBase
    {
         private readonly string _connectionString;

        public FavouritesController(IConfiguration config)
        {
            _connectionString = config.GetConnectionString("DefaultConnection");
        }

        [HttpPost("{userId}")]
        public IActionResult AddFavourite(int userId, [FromBody] JsonElement body)
        {
            string? songName = body.GetProperty("song_name").GetString();

            if (string.IsNullOrWhiteSpace(songName))
                return BadRequest(new { error = "Missing song name" });

            using var conn = new MySqlConnection(_connectionString);
            conn.Open();

            var cmd = new MySqlCommand("INSERT INTO favourites (user_id, song_name) VALUES (@uid, @name)", conn);
            cmd.Parameters.AddWithValue("@uid", userId);
            cmd.Parameters.AddWithValue("@name", songName);
            cmd.ExecuteNonQuery();

            return Ok(new { message = "Added to favourites" });
        }

        [HttpDelete("{userId}/{songName}")]
        public IActionResult RemoveFavourite(int userId, string songName)
        {
            using var conn = new MySqlConnection(_connectionString);
            conn.Open();

            var cmd = new MySqlCommand("DELETE FROM favourites WHERE user_id = @uid AND song_name = @name", conn);
            cmd.Parameters.AddWithValue("@uid", userId);
            cmd.Parameters.AddWithValue("@name", songName);
            cmd.ExecuteNonQuery();

            return Ok(new { message = "Favourite removed" });
        }

        [HttpGet("{userId}")]
        public IActionResult GetFavourites(int userId)
        {
            using var conn = new MySqlConnection(_connectionString);
            conn.Open();

            string query = @"
                SELECT f.song_name, s.album
                FROM favourites f
                JOIN songs s 
                  ON f.song_name COLLATE utf8mb4_general_ci = s.title COLLATE utf8mb4_general_ci
                WHERE f.user_id = @uid";

            var cmd = new MySqlCommand(query, conn);
            cmd.Parameters.AddWithValue("@uid", userId);
            using var reader = cmd.ExecuteReader();

            var favs = new List<Dictionary<string, object>>();
            while (reader.Read())
            {
                var item = new Dictionary<string, object>();
                for (int i = 0; i < reader.FieldCount; i++)
                    item[reader.GetName(i)] = reader.GetValue(i);
                favs.Add(item);
            }

            return Ok(favs);
        }
    }
}
