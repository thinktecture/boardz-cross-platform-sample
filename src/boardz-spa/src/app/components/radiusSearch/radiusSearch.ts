import {Component, OnInit} from '@angular/core';
import {GeoLocation} from '../../models/geoLocation';
import {GeolocationService} from '../../services/geolocation.service';
import {PlayersService} from '../../services/players.service';
import {NearByPlayer} from '../../models/nearbyPlayer';
import {FormBuilder} from '@angular/forms';

@Component({
    selector: 'app-radius-search',
    templateUrl: 'radiusSearch.html'
})
export class RadiusSearchComponent implements OnInit {
    public location: GeoLocation;
    public players: Array<NearByPlayer>;

    public search = this._formBuilder.group({
        radius: ['10']
    });

    constructor(private _geoLocationService: GeolocationService,
                private _playersService: PlayersService,
                private _formBuilder: FormBuilder) {
        this.players = [];
    }

    public ngOnInit() {
        this._geoLocationService.locate()
            .then((coordinates: GeoLocation) => this.location = coordinates);
    }

    public doSearch() {
        this._playersService.findNearby(this.search.value.radius, this.location)
            .subscribe(results => this.players = results);
    }
}
