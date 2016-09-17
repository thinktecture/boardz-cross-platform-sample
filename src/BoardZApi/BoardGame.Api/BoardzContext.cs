using BoardGame.Api.Models;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity;
using System.Data.Entity.Infrastructure.Annotations;

namespace BoardGame.Api
{
    /// <summary>
    /// BoardZ EF Context
    /// </summary>
    [DbConfigurationType(typeof(BoardzDatabaseConfiguration))]
    public class BoardzContext : DbContext
    {
        /// <summary>
        /// default ctor
        /// </summary>
        public BoardzContext() :
            base("name=BoardZDatabase")
        {
            Database.SetInitializer(new BoardzDatabaseInitializer());
        }
        /// <summary>
        /// Categories Set
        /// </summary>
        public DbSet<Category> Categories { get; set; }

        /// <summary>
        /// Age Rating Set
        /// </summary>
        public DbSet<AgeRating> AgeRatings { get; set; }

        /// <summary>
        /// All the Games :allthethings:
        /// </summary>
        public DbSet<Game> Games { get; set; }

        /// <summary>
        /// all players set
        /// </summary>
        public DbSet<Player> Players { get; set; }

        /// <summary>
        /// all coordinates used by the I'm playing feature
        /// </summary>
        public DbSet<Coordinate> Coordinates { get; set; } 

        /// <summary>
        /// override ModelCreating
        /// </summary>
        /// <param name="modelBuilder"></param>
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.HasDefaultSchema("boardz");

            modelBuilder.Entity<Game>()
                .ToTable("Games")
                .HasKey(game => game.Id)
                .HasOptional(game => game.AgeRating)
                .WithMany(ageRating => ageRating.Games)
                .HasForeignKey(game=> game.AgeRatingId);

            modelBuilder.Entity<Game>()
                .Property(game => game.UserName)
                .HasColumnAnnotation("GameUserNameIndex", new IndexAnnotation(new IndexAttribute()));

            modelBuilder.Entity<Game>()
                .HasMany<Category>(game => game.Categories)
                .WithMany(category => category.Games)
                .Map(gameCategories =>
                {
                    gameCategories.MapLeftKey("GameId");
                    gameCategories.MapRightKey("CategoryId");
                    gameCategories.ToTable("GameCategories");
                });

            modelBuilder.Entity<AgeRating>()
                .ToTable("AgeRatings")
                .HasKey(rating => rating.Id);

            modelBuilder.Entity<Category>()
               .ToTable("Categories")
                .HasKey(category => category.Id)
                .Property(category => category.UserName)
                .HasColumnAnnotation("CategoryUserNameIndex", new IndexAnnotation(new IndexAttribute()));

            modelBuilder.Entity<Coordinate>()
                .ToTable("Coordinates")
                .HasKey(coordinate => coordinate.Id);

            modelBuilder.Entity<Player>()
                .ToTable("Players")
                .HasKey(player => player.Id);

            modelBuilder.Entity<Player>()
                .HasRequired(player => player.Coordinate);

            modelBuilder.Entity<Player>()
                .HasRequired(player => player.Game);

        }
    }
}
