import { Injectable, isDevMode } from "@angular/core";

@Injectable()

export class CONFIG {
    private static ENDPOINTS = ['http://localhost:3000', 'http://www.freeraida.com'];

    getEndpoint() {
        if (isDevMode()) {
            return CONFIG.ENDPOINTS[0];
        }
        else return CONFIG.ENDPOINTS[1];
    }
}