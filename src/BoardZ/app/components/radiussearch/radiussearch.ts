import {Component, OnInit} from 'angular2/core';
import {GeoLocation} from '../../models/geolocation';
import {GeolocationService} from '../../services/geolocation.service';
import {PlayersService} from '../../services/players.service';
import {Player} from '../../models/player';

@Component({
    templateUrl: 'app/components/radiussearch/radiussearch.html'
})
export class RadiusSearchComponent implements OnInit {

    private _location: GeoLocation;
    private _radius: number = 10;
    private _players: Player[];
    constructor(private _geoLocationService: GeolocationService, private _playersService: PlayersService) {

    }

    public ngOnInit() {
        this._geoLocationService.locate()
            .then((coordinates: GeoLocation)=> this._location = coordinates);
    }

    public search(){
        this._playersService.findNearby(this._radius, this._location)
            .subscribe( results => this._players = results);
    }
}