
module BoardGame.Api.Models {
    
    export class Player {
        
        public id: string = null;
        public name: string = null;
        public coordinate: Coordinate = null;
        public boardGameId: string = null;
        public imageUrl: string = null;
        public boardGameName: string = null;
    }
}