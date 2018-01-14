import { Injectable, isDevMode } from "@angular/core";

@Injectable()

export class CONFIG {
    private static ENDPOINTS = ['http://localhost:3000', 'http://www.freeraida.com'];

    getEndpoint() {
        return CONFIG.ENDPOINTS[1];
    }
}