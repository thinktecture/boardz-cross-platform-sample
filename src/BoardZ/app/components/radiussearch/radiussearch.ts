import {Component, OnInit} from 'angular2/core';
import {GeoLocation} from '../../models/geolocation';
import {GeolocationService} from '../../services/geolocation/geolocation.service';

@Component({
    templateUrl: 'app/components/radiussearch/radiussearch.html'
})
export class RadiusSearchComponent implements OnInit{

    private _coordinates: GeoLocation;

    constructor(private _geoLocationService: GeolocationService){

    }

    public ngOnInit(){
        this._geoLocationService.locate()
            .then((coordinates)=> this._coordinates = coordinates);
    }
}