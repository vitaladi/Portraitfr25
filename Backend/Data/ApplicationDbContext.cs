using Microsoft.EntityFrameworkCore;
using PortraitFrAward.Models;

namespace PortraitFrAward.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Participant> Participants { get; set; }
        public DbSet<MessageContact> MessagesContact { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

       

            // Vérifier et ajouter les contraintes uniques uniquement si elles n'existent pas
            modelBuilder.Entity<Participant>()
                .HasIndex(p => p.Email)
                .IsUnique()
                .HasDatabaseName("IX_participants_Email");

            modelBuilder.Entity<Participant>()
                .HasIndex(p => p.Instagram)
                .IsUnique()
                .HasDatabaseName("IX_participants_Instagram");
        }
    }
}
