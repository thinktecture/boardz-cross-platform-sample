namespace BoardGame.Api.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class InitialCreate : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "boardz.AgeRatings",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        Name = c.String(),
                        ColorIndicator = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "boardz.Games",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        Name = c.String(),
                        Edition = c.String(),
                        AgeRatingId = c.Guid(),
                        Description = c.String(),
                        UserName = c.String(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("boardz.AgeRatings", t => t.AgeRatingId)
                .Index(t => t.AgeRatingId);
            
            CreateTable(
                "boardz.Categories",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        Name = c.String(),
                        UserName = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "boardz.Coordinates",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        Latitude = c.Double(nullable: false),
                        Longitude = c.Double(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "boardz.Players",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        Name = c.String(),
                        CoordinateId = c.Guid(nullable: false),
                        GameId = c.Guid(nullable: false),
                        ImageUrl = c.String(),
                        PlayingSince = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("boardz.Coordinates", t => t.CoordinateId, cascadeDelete: true)
                .ForeignKey("boardz.Games", t => t.GameId, cascadeDelete: true)
                .Index(t => t.CoordinateId)
                .Index(t => t.GameId);
            
            CreateTable(
                "boardz.GameCategories",
                c => new
                    {
                        GameId = c.Guid(nullable: false),
                        CategoryId = c.Guid(nullable: false),
                    })
                .PrimaryKey(t => new { t.GameId, t.CategoryId })
                .ForeignKey("boardz.Games", t => t.GameId, cascadeDelete: true)
                .ForeignKey("boardz.Categories", t => t.CategoryId, cascadeDelete: true)
                .Index(t => t.GameId)
                .Index(t => t.CategoryId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("boardz.Players", "GameId", "boardz.Games");
            DropForeignKey("boardz.Players", "CoordinateId", "boardz.Coordinates");
            DropForeignKey("boardz.GameCategories", "CategoryId", "boardz.Categories");
            DropForeignKey("boardz.GameCategories", "GameId", "boardz.Games");
            DropForeignKey("boardz.Games", "AgeRatingId", "boardz.AgeRatings");
            DropIndex("boardz.GameCategories", new[] { "CategoryId" });
            DropIndex("boardz.GameCategories", new[] { "GameId" });
            DropIndex("boardz.Players", new[] { "GameId" });
            DropIndex("boardz.Players", new[] { "CoordinateId" });
            DropIndex("boardz.Games", new[] { "AgeRatingId" });
            DropTable("boardz.GameCategories");
            DropTable("boardz.Players");
            DropTable("boardz.Coordinates");
            DropTable("boardz.Categories");
            DropTable("boardz.Games");
            DropTable("boardz.AgeRatings");
        }
    }
}
