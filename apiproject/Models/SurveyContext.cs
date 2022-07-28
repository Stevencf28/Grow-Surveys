using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace apiproject.Models
{
    public partial class SurveyContext : DbContext
    {
        public SurveyContext()
        {
        }

        public SurveyContext(DbContextOptions<SurveyContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Answer> Answers { get; set; }
        public virtual DbSet<Survey> Surveys { get; set; }
        public virtual DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "SQL_Latin1_General_CP1_CI_AS");

            modelBuilder.Entity<Answer>(entity =>
            {
                entity.ToTable("Answer");

                entity.Property(e => e.AnswerId).ValueGeneratedNever();

                entity.Property(e => e.Text)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Answers)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Answer_Users_UserId");
            });

            modelBuilder.Entity<Survey>(entity =>
            {
                entity.ToTable("Survey");

                entity.Property(e => e.SurveyId).ValueGeneratedNever();

                entity.Property(e => e.Title)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Surveys)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Survey_Users_UserId");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("User");

                entity.Property(e => e.UserId).ValueGeneratedNever();

                entity.Property(e => e.FirstName)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.LastName)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.UserName)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.UserType)
                    .IsRequired()
                    .HasMaxLength(50);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
