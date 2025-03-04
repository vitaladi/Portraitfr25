using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PortraitFrAward.Data;
using PortraitFrAward.Models;
using System;
using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;

namespace PortraitFrAward.Controllers
{
    [Route("api/contact")]
    [ApiController]
    public class ContactController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ContactController(ApplicationDbContext context)
        {
            _context = context;
        }

        public class ContactRequest
        {
            [Required] public string Nom { get; set; }
            [Required] [EmailAddress] public string Email { get; set; }
            [Required] public string Message { get; set; }
        }

        [HttpPost]
        public async Task<IActionResult> EnvoyerMessage([FromBody] ContactRequest request)
        {
            if (!ModelState.IsValid)
                return BadRequest(new { message = "Tous les champs sont requis et valides." });

            var message = new MessageContact
            {
                Nom = request.Nom,
                Email = request.Email,
                Message = request.Message,
                DateEnvoi = DateTime.UtcNow
            };

            try
            {
                _context.MessagesContact.Add(message);
                await _context.SaveChangesAsync();
                return Ok(new { message = "Message enregistré avec succès !" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Erreur interne du serveur", error = ex.Message });
            }
        }

        [HttpGet("list")]
        public async Task<IActionResult> GetMessages()
        {
            var messages = await _context.MessagesContact
                .OrderByDescending(m => m.DateEnvoi)
                .ToListAsync();

            return Ok(messages);
        }
    }
}
