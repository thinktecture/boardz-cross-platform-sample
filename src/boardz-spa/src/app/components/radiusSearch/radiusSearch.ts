import {Component, OnInit} from '@angular/core';
import {GeoLocation} from '../../models/geoLocation';
import {GeolocationService} from '../../services/geolocationService';
import {PlayersService} from '../../services/playersService';
import {NearByPlayer} from '../../models/nearbyPlayer';
import {AbstractControl, FormBuilder} from '@angular/forms';

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
        this._playersService.findNearby(this.search.value.radis, this.location)
            .subscribe(results => this.players = results);
    }
}
