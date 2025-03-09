using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PortraitFrAward.Data;
using PortraitFrAward.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;

namespace PortraitFrAward.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ParticipantController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<ParticipantController> _logger;

        public ParticipantController(ApplicationDbContext context, ILogger<ParticipantController> logger)
        {
            _context = context;
            _logger = logger;
        }

        /// <summary>
        /// Inscription d'un participant avec envoi de photo
        /// </summary>
        [HttpPost("inscription")]
        public async Task<IActionResult> Inscription(
            [FromForm] string nom,
            [FromForm] string instagram,
            [FromForm] string email,
            [FromForm] string categorie,
            [FromForm] string ville,
            [FromForm] string description,
            [FromForm] bool certificatPhoto,
            [FromForm] IFormFile? photo)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(nom) ||
                    string.IsNullOrWhiteSpace(instagram) ||
                    string.IsNullOrWhiteSpace(email) ||
                    string.IsNullOrWhiteSpace(categorie) ||
                    string.IsNullOrWhiteSpace(ville))
                {
                    return BadRequest(new { message = "Tous les champs sont requis." });
                }

                if (!email.Contains("@"))
                {
                    return BadRequest(new { message = "L'email n'est pas valide." });
                }

                var categoriesValides = new string[] { "Photographe", "Modèle", "MUA", "Studio", "Photo de l'année" };
                if (!categoriesValides.Contains(categorie))
                {
                    return BadRequest(new { message = "Catégorie invalide." });
                }

                // Vérifier si l'utilisateur existe déjà
                var existingParticipant = await _context.Participants
                    .FirstOrDefaultAsync(p => p.Email.ToLower() == email.ToLower() || p.Instagram.ToLower() == instagram.ToLower());

                if (existingParticipant != null)
                {
                    return Conflict(new { message = "Un participant avec cet email ou cet Instagram est déjà inscrit." });
                }

                // Vérifier que le certificat est bien coché si une photo est ajoutée
                if (photo != null && !certificatPhoto)
                {
                    return BadRequest(new { message = "Vous devez certifier l’authenticité de la photo." });
                }

                string photoUrl = "";
                if (photo != null && photo.Length > 0)
                {
                    try
                    {
                        // 🚀 Utilisation d'un dossier temporaire pour Railway
                        var uploadPath = Path.Combine(Path.GetTempPath(), "uploads");
                        if (!Directory.Exists(uploadPath))
                        {
                            Directory.CreateDirectory(uploadPath);
                        }

                        // Générer un nom de fichier basé sur l'Instagram
                        string fileExtension = Path.GetExtension(photo.FileName);
                        string fileName = $"{Path.GetFileNameWithoutExtension(photo.FileName)}-@{instagram}{fileExtension}";
                        string filePath = Path.Combine(uploadPath, fileName);

                        using (var stream = new FileStream(filePath, FileMode.Create))
                        {
                            await photo.CopyToAsync(stream);
                        }

                        photoUrl = $"/uploads/{fileName}";
                        _logger.LogInformation($"Photo enregistrée : {photoUrl}");
                    }
                    catch (Exception ex)
                    {
                        _logger.LogError($"Erreur lors du stockage de la photo : {ex.Message}");
                        return StatusCode(500, new { message = "Erreur lors du téléchargement de la photo." });
                    }
                }

                var participant = new Participant
                {
                    Nom = nom,
                    Instagram = instagram,
                    Email = email,
                    Categorie = categorie,
                    Ville = ville,
                    Description = description,
                    PhotoUrl = photoUrl,
                    CertificatPhoto = certificatPhoto,
                    InscriptionDate = DateTime.UtcNow
                };

                _context.Participants.Add(participant);
                await _context.SaveChangesAsync();

                return Ok(new { message = "Inscription réussie !" });
            }
            catch (Exception ex)
            {
                _logger.LogError($"Erreur lors de l'inscription : {ex.Message}");
                return StatusCode(500, new { message = "Erreur interne du serveur." });
            }
        }

        /// <summary>
        /// Récupérer le nombre total de participants
        /// </summary>
        [HttpGet("count")]
        public IActionResult GetParticipantCount()
        {
            try
            {
                var count = _context.Participants.Count();
                return Ok(new { count });
            }
            catch (Exception ex)
            {
                _logger.LogError($"Erreur lors du comptage des participants : {ex.Message}");
                return StatusCode(500, new { message = "Erreur interne du serveur." });
            }
        }

        [HttpGet("participants")]
        public async Task<IActionResult> GetParticipants()
        {
            var participants = await _context.Participants.ToListAsync();
            return Ok(participants);
        }

        [HttpGet("list")]
        public async Task<IActionResult> GetParticipants(
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 10,
            [FromQuery] string? categorie = null)
        {
            var query = _context.Participants.AsQueryable();

            if (!string.IsNullOrEmpty(categorie))
            {
                query = query.Where(p => p.Categorie == categorie);
            }

            var totalParticipants = await query.CountAsync();
            var participants = await query
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .Select(p => new
                {
                    p.Nom,
                    p.Instagram,
                    p.Email,
                    p.Categorie,
                    p.Ville,
                    p.Description,
                    p.PhotoUrl
                })
                .ToListAsync();

            return Ok(new
            {
                totalParticipants,
                totalPages = (int)Math.Ceiling((double)totalParticipants / pageSize),
                participants
            });
        }
    }
}
