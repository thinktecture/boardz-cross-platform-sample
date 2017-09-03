using BoardZ.API.Configuration;
using BoardZ.API.Models;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;

namespace BoardZ.API.Database
{
    public class BoardZContext : DbContext
    {
        protected BoardZConfiguration Configuration { get; }

        public BoardZContext(IOptions<BoardZConfiguration> configuration)
        {
            Configuration = configuration.Value;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(Configuration.DbConnectionString);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasDefaultSchema("boardz");

            modelBuilder.Entity<GameCategory>()
                .ToTable("GamesCategories")
                .HasKey(gc => new {gc.GameId, gc.CategoryId});

            modelBuilder.Entity<GameCategory>()
                .HasOne(gc => gc.Game)
                .WithMany(g => g.GameCategories)
                .HasForeignKey(gc => gc.GameId);

            modelBuilder.Entity<GameCategory>()
                .HasOne(gc => gc.Category)
                .WithMany(c => c.GameCategories)
                .HasForeignKey(gc => gc.CategoryId);
            
            modelBuilder.Entity<Game>()
                .ToTable("Games");
            modelBuilder.Entity<Game>()
                .HasIndex(game => game.Name);


            modelBuilder.Entity<Game>()
                .HasOne(game => game.AgeRating)
                .WithMany(ageRating => ageRating.Games)
                .HasForeignKey(game => game.AgeRatingId);
    

            modelBuilder.Entity<AgeRating>()
                .ToTable("AgeRatings")
                .HasKey(rating => rating.Id);

            modelBuilder.Entity<Category>()
                .HasIndex(category => category.UserName);

            modelBuilder.Entity<Category>().HasKey(c => c.Id);

            modelBuilder.Entity<Category>()
                .ToTable("Categories")
                .Ignore(c => c.GameNames)
                .Ignore(c => c.NumberOfGames);

            modelBuilder.Entity<Coordinate>()
                .ToTable("Coordinates")
                .HasKey(coordinate => coordinate.Id);

            modelBuilder.Entity<Player>()
                .ToTable("Players")
                .HasKey(player => player.Id);

            modelBuilder.Entity<Player>()
                .HasOne(player => player.Coordinate)
                .WithMany()
                .HasForeignKey(player => player.CoordinateId);

            modelBuilder.Entity<Player>()
                .HasOne(player => player.Game)
                .WithMany()
                .HasForeignKey(player => player.GameId);


            modelBuilder.Entity<Game>().Property(game => game.RowVersion).IsRowVersion();
            modelBuilder.Entity<Game>()
                .Ignore(game => game.State)
                .Ignore(game => game.RowVersionAsInt);

            modelBuilder.Entity<Category>().Property(category => category.RowVersion).IsRowVersion();
            modelBuilder.Entity<Category>()
                .Ignore(category => category.State)
                .Ignore(category => category.RowVersionAsInt);
        }

        public DbSet<AgeRating> AgeRatings { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Game> Games { get; set; }
        public DbSet<Player> Players { get; set; }
        public DbSet<Coordinate> Coordinates { get; set; }
    }
}
