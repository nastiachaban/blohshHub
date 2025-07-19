using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;

namespace blohsh_backend.Controllers
{
    [ApiController]
    [Route("api/comments")]
    public class CommentsController : ControllerBase
    {
        private readonly string _connectionString;

        public CommentsController(IConfiguration config)
        {
            _connectionString = config.GetConnectionString("DefaultConnection");
        }
        [HttpGet]
        public IActionResult GetComments()
        {
            using var conn = new MySqlConnection(_connectionString);
            conn.Open();

            var cmd = new MySqlCommand(@"SELECT comments.*, users.role FROM comments
                                         JOIN users ON comments.user_id = users.id
                                         ORDER BY comments.created_at DESC", conn);

            using var reader = cmd.ExecuteReader();
            var comments = new List<dynamic>();

            while (reader.Read())
            {
                comments.Add(new
                {
                    id = reader.GetInt32("id"),
                    user_id = reader.GetInt32("user_id"),
                    username = reader.GetString("username"),
                    content = reader.GetString("content"),
                    created_at = reader.GetDateTime("created_at"),
                    role = reader.GetString("role")
                });
            }

            return Ok(comments);
        }

        [HttpPost]
        public IActionResult PostComment([FromBody] Comment comment)
        {
            using var conn = new MySqlConnection(_connectionString);
            conn.Open();

            var cmd = new MySqlCommand("INSERT INTO comments (user_id, username, content) VALUES (@user_id, @username, @content)", conn);
            cmd.Parameters.AddWithValue("@user_id", comment.user_id);
            cmd.Parameters.AddWithValue("@username", comment.username);
            cmd.Parameters.AddWithValue("@content", comment.content);
            cmd.ExecuteNonQuery();

            return Created("/api/comments", comment);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateComment(int id, [FromBody] UpdateCommentDto dto)
        {
            if (string.IsNullOrWhiteSpace(dto.content))
                return BadRequest(new { message = "Content is required" });

            using var conn = new MySqlConnection(_connectionString);
            conn.Open();

            var cmd = new MySqlCommand("UPDATE comments SET content = @content WHERE id = @id", conn);
            cmd.Parameters.AddWithValue("@content", dto.content);
            cmd.Parameters.AddWithValue("@id", id);
            int affected = cmd.ExecuteNonQuery();

            if (affected == 0)
                return NotFound(new { message = "Comment not found" });

            return Ok(new { success = true });
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteComment(int id)
        {
            using var conn = new MySqlConnection(_connectionString);
            conn.Open();

            var cmd = new MySqlCommand("DELETE FROM comments WHERE id = @id", conn);
            cmd.Parameters.AddWithValue("@id", id);
            cmd.ExecuteNonQuery();

            return Ok(new { success = true });
        }

        public class Comment
        {
            public int user_id { get; set; }
            public string username { get; set; }
            public string content { get; set; }
        }

        public class UpdateCommentDto
        {
            public string content { get; set; }
        }
    }
}
