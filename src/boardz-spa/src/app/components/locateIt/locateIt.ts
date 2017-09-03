import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {GeoLocation} from '../../models/geoLocation';
import {GeolocationService} from '../../services/geolocation.service';
import {LatLng, map, marker, tileLayer} from 'leaflet';

@Component({
    selector: 'app-locate-it',
    templateUrl: 'locateIt.html'
})
export class LocateItComponent implements OnInit {
    public hasError = false;
    public isLocating = false;
    public coordinates: GeoLocation = null;
    @Output()
    public onLocated: EventEmitter<GeoLocation> = new EventEmitter<GeoLocation>();

    public theMap;

    constructor(private _geolocationService: GeolocationService) {
        L.Icon.Default.imagePath = 'app/images';
    }

    ngOnInit(): any {
        // Berlin ;-)
        this.theMap = map('map').setView([52.5167, 13.3833], 7);

        tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
            maxZoom: 13
        }).addTo(this.theMap);

        this.isLocating = true;
        this._geolocationService.locate()
            .then((geoLocation: GeoLocation) => {
                this.hasError = false;
                this.isLocating = false;
                this.coordinates = geoLocation;
                this.onLocated.emit(geoLocation);

                this.setMapMarkerAndView();
            })
            .catch(() => {
                this.hasError = true;
                this.isLocating = false;
            });
    }

    private setMapMarkerAndView() {
        const c = new LatLng(this.coordinates.latitude, this.coordinates.longitude);
        this.theMap.setView(c, 13);
        marker(c).addTo(this.theMap);
    }
}
