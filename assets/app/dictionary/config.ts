import { Injectable, isDevMode } from "@angular/core";

@Injectable()

export class CONFIG {
    private static ENDPOINTS = ['http://localhost:3000', 'https://www.freeraida.com'];
    private static ElevationKey = 'AIzaSyABj_T1wCMVSfQgskqWFwzHJQKaBFjepko';

    getEndpoint() {
        if (isDevMode()) return CONFIG.ENDPOINTS[0];
        else return CONFIG.ENDPOINTS[1];
    }

    getElevationKey() {
        return CONFIG.ElevationKey;
    }
}