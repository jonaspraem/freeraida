import { Injectable, isDevMode } from "@angular/core";

@Injectable()

export class CONFIG {
    public static GOOGLE_MAPS_KEY = 'AIzaSyABj_T1wCMVSfQgskqWFwzHJQKaBFjepko';
    public static STATIC_MAPS_ENDPOINT = 'https://maps.googleapis.com/maps/api/staticmap';
    private static ENDPOINTS = ['http://localhost:3000', 'https://www.freeraida.com'];


    getEndpoint() {
        if (isDevMode()) return CONFIG.ENDPOINTS[0];
        else return CONFIG.ENDPOINTS[1];
    }
}