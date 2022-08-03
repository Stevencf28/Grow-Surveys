using Microsoft.EntityFrameworkCore;

namespace apiproject.Models
{
    public partial class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options): base(options)
        {

        }
        public virtual DbSet<User> Users { get; set; } = null!;

        public virtual DbSet<Survey> Surveys { get; set; } = null!;

        public virtual DbSet<Answer> Answers { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // User Entity
            modelBuilder.Entity<User>(entity =>
            {
                entity.Property(e => e.UserId)
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .HasColumnName("UserId");

                entity.HasKey(e => e.UserName)
                    .HasName("PK__Users__F3DBC5738C12F82E");

                entity.Property(e => e.UserName)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("UserName");

                entity.Property(e => e.FirstName)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("FirstName");

                entity.Property(e => e.LastName)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("LastName");

                entity.Property(e => e.Password)
                    .HasMaxLength(30)
                    .IsUnicode(false)
                    .HasColumnName("Password");

                entity.Property(e => e.AccountType)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("AccountType");
            });

            // Survey Entity
            modelBuilder.Entity<Survey>(entity =>
            {
                entity.HasKey(e => e.SurveyId)
                    .HasName("PK__Surveys__F3DBC5738C12F82E");

                entity.Property(e => e.SurveyId)
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .HasColumnName("SurveyId");

                entity.Property(e => e.UserId)
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .HasColumnName("UserId");


                entity.Property(e => e.Title)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("Title");

                entity.Property(e => e.Q1)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("Q1");

                entity.Property(e => e.Q2)
                    .HasMaxLength(30)
                    .IsUnicode(false)
                    .HasColumnName("Q2");

                entity.Property(e => e.Q3)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("Q3");
            });

            // Answer Entity
            modelBuilder.Entity<Answer>(entity =>
            {
                entity.HasKey(e => e.AnswerId)
                    .HasName("PK__Answers__F3DBC5738C12F82E");

                entity.Property(e => e.AnswerId)
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .HasColumnName("AnswerId");

                entity.Property(e => e.UserId)
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .HasColumnName("UserId");


                entity.Property(e => e.SurveyId)
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .HasColumnName("SurveyId");

                entity.Property(e => e.Q1)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("Q1");

                entity.Property(e => e.Q2)
                    .HasMaxLength(30)
                    .IsUnicode(false)
                    .HasColumnName("Q2");

                entity.Property(e => e.Q3)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("Q3");
            });

            OnModelCreatingPartial(modelBuilder);
        }
        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
