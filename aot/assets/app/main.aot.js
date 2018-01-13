import './polyfills';
import 'core-js/es7/reflect';
import { platformBrowser } from '@angular/platform-browser';
import { AppModuleNgFactory } from './app.module.ngfactory';
import { enableProdMode } from "@angular/core";
enableProdMode();
platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);
//# sourceMappingURL=D:/Projects/freeraida/assets/app/main.aot.js.map