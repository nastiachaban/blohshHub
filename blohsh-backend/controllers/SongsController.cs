using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;

namespace blohsh_backend.Controllers
{
    [ApiController]
    [Route("api/songs")]
    public class SongsController : ControllerBase
    {
        private readonly string _connStr = "server=localhost;user=root;password=nastia!2006;database=blohsh";

        [HttpGet]
        public IActionResult GetSongs([FromQuery] string? album)
        {
            using var conn = new MySqlConnection(_connStr);
            conn.Open();

            string query = album != null
                ? "SELECT * FROM songs WHERE album = @album ORDER BY track_number"
                : "SELECT * FROM songs ORDER BY album, track_number";

            var cmd = new MySqlCommand(query, conn);
            if (album != null)
                cmd.Parameters.AddWithValue("@album", album);

            using var reader = cmd.ExecuteReader();
            var songs = new List<Dictionary<string, object>>();

            while (reader.Read())
            {
                var song = new Dictionary<string, object>();
                for (int i = 0; i < reader.FieldCount; i++)
                    song[reader.GetName(i)] = reader.GetValue(i);
                songs.Add(song);
            }

            return Ok(songs);
        }
    }
}
