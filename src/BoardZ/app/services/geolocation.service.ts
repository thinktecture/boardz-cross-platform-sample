import {Injectable} from 'angular2/core';
import {GeoLocation} from '../models/geolocation';

@Injectable()
export class GeolocationService {
    public locate() {
        return new Promise((resolve, reject)=> {
            if (window.navigator && window.navigator.geolocation) {
                window.navigator.geolocation.getCurrentPosition((pos)=> {
                    resolve(new GeoLocation(pos.coords.latitude, pos.coords.longitude, 16));
                }, (err)=> {
                    reject(err);
                }, {
                    enableHighAccuracy: false,
                    timeout: 5000,
                    maximumAge: 0
                });
            } else {
                reject('This platform does not support geolocation.');
            }
        });
    }
} 
