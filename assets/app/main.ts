import './polyfills.ts';
import 'zone.js';
import 'reflect-metadata';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

// Google material design
import 'hammerjs';

import { AppModule } from './app.module';

platformBrowserDynamic().bootstrapModule(AppModule);
