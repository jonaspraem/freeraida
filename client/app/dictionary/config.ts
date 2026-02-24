import { Injectable, isDevMode } from '@angular/core';

@Injectable()
export class CONFIG {
  public static STATIC_MAPS_ENDPOINT = 'https://maps.googleapis.com/maps/api/staticmap';
  private static ENDPOINTS = ['http://localhost:3000', 'https://www.freeraida.com'];

  public static getGoogleMapsKey(): string {
    const runtimeEnvKey = (globalThis as any)?.__env?.GOOGLE_MAPS_API_KEY;
    const runtimeGlobalKey = (globalThis as any)?.GOOGLE_MAPS_API_KEY;
    const buildTimeKey = (globalThis as any)?.process?.env?.GOOGLE_MAPS_API_KEY;
    return runtimeEnvKey || runtimeGlobalKey || buildTimeKey || '';
  }

  getEndpoint() {
    if (isDevMode()) return CONFIG.ENDPOINTS[0];
    else return CONFIG.ENDPOINTS[1];
  }
}
