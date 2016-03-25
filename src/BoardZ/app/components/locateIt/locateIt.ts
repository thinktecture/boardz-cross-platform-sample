///<reference path="../../../../../typings/main/ambient/leaflet/leaflet.d.ts" />

import {Component, Output, OnInit, EventEmitter} from 'angular2/core';
import {JsonPipe} from 'angular2/common';

import {GeoLocation} from '../../models/geoLocation';
import {GeolocationService} from '../../services/geolocationService';

@Component({
    selector: 'locate-it',
    pipes: [JsonPipe],
    templateUrl: 'app/components/locateIt/locateIt.html'
})
export class LocateItComponent implements OnInit {
    private _hasError: boolean = false;
    private _isLocating: boolean = false;
    private _coords: GeoLocation = null;
    @Output('onLocated')
    private _onLocated: EventEmitter<GeoLocation> = new EventEmitter<GeoLocation>();

    public map;

    constructor(private _geolocationService: GeolocationService) {
        L.Icon.Default.imagePath = 'app/images';
    }

    ngOnInit(): any {
        // Berlin ;-)
        this.map = L.map('map').setView([52.5167, 13.3833], 7);

        L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
            maxZoom: 13
        }).addTo(this.map);

        this._isLocating = true;
        
        this._geolocationService.locate()
            .then((coords: GeoLocation)=> {
                this._hasError = false;
                this._isLocating = false;
                this._coords = coords;
                this._onLocated.emit(coords);

                this.setMapMarkerAndView();
            })
            .catch(()=> {
                this._hasError = true;
                this._isLocating = false;

            });
    }

    private setMapMarkerAndView() {
        const coordinates = [this._coords.latitude, this._coords.longitude];
        this.map.setView(coordinates, 13);
        L.marker(coordinates).addTo(this.map);
    }
}
