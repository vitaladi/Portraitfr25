using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PortraitFrAward.Models
{
    [Table("participants")]
    public class Participant
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string Nom { get; set; } = string.Empty;

        [Required]
        [StringLength(100)]
        public string Instagram { get; set; } = string.Empty;

        [Required]
        [EmailAddress]

        public string Email { get; set; } = string.Empty;

        [Required]
        public string Categorie { get; set; } = string.Empty; // Photographe, Modèle, MUA, Studio, Photo de l'année

        [Required]
        public string Ville { get; set; } = string.Empty; // 🚀 Nouveau champ obligatoire

        public string Description { get; set; } = string.Empty;

        public string PhotoUrl { get; set; } = string.Empty;

        [Required]
        public bool CertificatPhoto { get; set; } = false;

        public DateTime InscriptionDate { get; set; } = DateTime.UtcNow;
    }
}
