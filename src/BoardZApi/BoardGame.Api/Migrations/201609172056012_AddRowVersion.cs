namespace BoardGame.Api.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddRowVersion : DbMigration
    {
        public override void Up()
        {
            AddColumn("boardz.Games", "RowVersion", c => c.Binary(nullable: false, fixedLength: true, timestamp: true, storeType: "rowversion"));
            AddColumn("boardz.Categories", "RowVersion", c => c.Binary(nullable: false, fixedLength: true, timestamp: true, storeType: "rowversion"));
        }
        
        public override void Down()
        {
            DropColumn("boardz.Categories", "RowVersion");
            DropColumn("boardz.Games", "RowVersion");
        }
    }
}
