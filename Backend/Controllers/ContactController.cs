using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PortraitFrAward.Data;
using PortraitFrAward.Models;
using System;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;

namespace PortraitFrAward.Controllers
{
    [Route("api/contact")]
    [ApiController]
    public class ContactController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<ContactController> _logger;

        public ContactController(ApplicationDbContext context, ILogger<ContactController> logger)
        {
            _context = context;
            _logger = logger;
        }

        public class ContactRequest
        {
            [Required] public string Nom { get; set; }
            [Required] [EmailAddress] public string Email { get; set; }
            [Required] public string Message { get; set; }
        }

        /// <summary>
        /// Enregistre un message de contact en base de données
        /// </summary>
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

                _logger.LogInformation("Message enregistré avec succès : {Email}", request.Email);
                return Ok(new { message = "Message enregistré avec succès !" });
            }
            catch (Exception ex)
            {
                _logger.LogError($"Erreur lors de l'enregistrement du message : {ex.Message}");
                return StatusCode(500, new { message = "Erreur interne du serveur", error = ex.Message });
            }
        }

        /// <summary>
        /// Récupère la liste des messages de contact
        /// </summary>
        [HttpGet("list")]
        public async Task<IActionResult> GetMessages()
        {
            try
            {
                var messages = await _context.MessagesContact
                    .OrderByDescending(m => m.DateEnvoi)
                    .ToListAsync();

                return Ok(messages);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Erreur lors de la récupération des messages : {ex.Message}");
                return StatusCode(500, new { message = "Erreur interne du serveur." });
            }
        }
    }
}
