import {GeoLocation} from './geoLocation';

export class Player{
    public id: string;
    public name: string;
    public boardGameId: string;
    public boardGameName: string;
    public coordinate: GeoLocation;
    public imageUrl: string;
}