using System;
using System.ComponentModel.DataAnnotations;

namespace PortraitFrAward.Models
{
    public class MessageContact
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Nom { get; set; } = string.Empty;

        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required]
        public string Message { get; set; } = string.Empty;

        public DateTime DateEnvoi { get; set; } = DateTime.UtcNow;
    }
}
