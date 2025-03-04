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

            modelBuilder.Entity<Participant>()
                .HasIndex(p => p.Email)
                .IsUnique();

            modelBuilder.Entity<Participant>()
                .HasIndex(p => p.Instagram)
                .IsUnique();
                            modelBuilder.Entity<MessageContact>().ToTable("MessagesContact");

        }
    }
}
