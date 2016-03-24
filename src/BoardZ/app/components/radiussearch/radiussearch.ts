import {Component, OnInit} from 'angular2/core';
import {DecimalPipe} from 'angular2/common';

import {GeoLocation} from '../../models/geoLocation';
import {GeolocationService} from '../../services/geolocationService';
import {PlayersService} from '../../services/playersService';
import {NearByPlayer} from '../../models/nearbyPlayer';

@Component({
    templateUrl: 'app/components/radiusSearch/radiusSearch.html',
    pipes: [DecimalPipe]
})
export class RadiusSearchComponent implements OnInit {
    private _location: GeoLocation;
    private _radius: number = 10;
    private _players: NearByPlayer[];

    constructor(private _geoLocationService: GeolocationService, 
                private _playersService: PlayersService) {
    }

    public ngOnInit() {
        this._geoLocationService.locate()
            .then((coordinates: GeoLocation)=> this._location = coordinates);
    }

    public search() {
        this._playersService.findNearby(this._radius, this._location)
            .subscribe(results => this._players = results);
    }
}
