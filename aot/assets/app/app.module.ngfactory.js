/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 
import * as i0 from "@angular/core";
import * as i1 from "./app.module";
import * as i2 from "./app.component";
import * as i3 from "./profile/profile.component.ngfactory";
import * as i4 from "./posts/feed/live-feed.component.ngfactory";
import * as i5 from "./lines/register-ride.component.ngfactory";
import * as i6 from "./tracker/track-page.component.ngfactory";
import * as i7 from "./profile/settings/settings.component.ngfactory";
import * as i8 from "./landing-page/landing-page.component.ngfactory";
import * as i9 from "./webapp.component.ngfactory";
import * as i10 from "./app.component.ngfactory";
import * as i11 from "@angular/common";
import * as i12 from "@angular/platform-browser";
import * as i13 from "@angular/animations/browser";
import * as i14 from "@angular/platform-browser/animations";
import * as i15 from "@angular/animations";
import * as i16 from "@angular/common/http";
import * as i17 from "@angular/forms";
import * as i18 from "@angular/cdk/bidi";
import * as i19 from "@angular/cdk/platform";
import * as i20 from "@angular/material/core";
import * as i21 from "@angular/cdk/a11y";
import * as i22 from "./errors/error.service";
import * as i23 from "./posts/post.service";
import * as i24 from "@angular/cdk/collections";
import * as i25 from "@angular/material/icon";
import * as i26 from "@agm/core/utils/browser-globals";
import * as i27 from "@agm/core/services/maps-api-loader/maps-api-loader";
import * as i28 from "@agm/core/services/maps-api-loader/lazy-maps-api-loader";
import * as i29 from "./lines/line.service";
import * as i30 from "./profile/profile.service";
import * as i31 from "@angular/cdk/scrolling";
import * as i32 from "@angular/cdk/overlay";
import * as i33 from "@angular/router";
import * as i34 from "./auth/auth.service";
import * as i35 from "./auth/auth-guard.service";
import * as i36 from "./dictionary/flag-dictionary";
import * as i37 from "./dictionary/color-dictionary";
import * as i38 from "./profile/profile.component";
import * as i39 from "./posts/feed/live-feed.component";
import * as i40 from "./lines/register-ride.component";
import * as i41 from "./tracker/track-page.component";
import * as i42 from "./profile/settings/settings.component";
import * as i43 from "./webapp.routing";
import * as i44 from "./landing-page/landing-page.component";
import * as i45 from "./webapp.component";
import * as i46 from "@angular/material/card";
import * as i47 from "@angular/material/form-field";
import * as i48 from "@angular/material/input";
import * as i49 from "./landing-page/landing-page.module";
import * as i50 from "@angular/material/button";
import * as i51 from "./posts/post.module";
import * as i52 from "@agm/core/core.module";
import * as i53 from "@angular/material/button-toggle";
import * as i54 from "@angular/material/list";
import * as i55 from "./lines/ride-center.module";
import * as i56 from "./profile/profile.module";
import * as i57 from "./tracker/track-page.module";
import * as i58 from "@angular/cdk/portal";
import * as i59 from "@angular/material/sidenav";
import * as i60 from "@angular/cdk/accordion";
import * as i61 from "@angular/material/expansion";
import * as i62 from "@angular/material/toolbar";
import * as i63 from "./webapp.module";
var AppModuleNgFactory = i0.ɵcmf(i1.AppModule, [i2.AppComponent], function (_l) { return i0.ɵmod([i0.ɵmpd(512, i0.ComponentFactoryResolver, i0.ɵCodegenComponentFactoryResolver, [[8, [i3.ProfileComponentNgFactory, i4.LiveFeedComponentNgFactory, i5.RegisterRideComponentNgFactory, i6.TrackPageComponentNgFactory, i7.SettingsComponentNgFactory, i8.LandingPageComponentNgFactory, i9.WebAppComponentNgFactory, i10.AppComponentNgFactory]], [3, i0.ComponentFactoryResolver], i0.NgModuleRef]), i0.ɵmpd(5120, i0.LOCALE_ID, i0.ɵo, [[3, i0.LOCALE_ID]]), i0.ɵmpd(4608, i11.NgLocalization, i11.NgLocaleLocalization, [i0.LOCALE_ID, [2, i11.ɵa]]), i0.ɵmpd(5120, i0.APP_ID, i0.ɵh, []), i0.ɵmpd(5120, i0.IterableDiffers, i0.ɵm, []), i0.ɵmpd(5120, i0.KeyValueDiffers, i0.ɵn, []), i0.ɵmpd(4608, i12.DomSanitizer, i12.ɵe, [i11.DOCUMENT]), i0.ɵmpd(6144, i0.Sanitizer, null, [i12.DomSanitizer]), i0.ɵmpd(4608, i12.HAMMER_GESTURE_CONFIG, i12.HammerGestureConfig, []), i0.ɵmpd(5120, i12.EVENT_MANAGER_PLUGINS, function (p0_0, p0_1, p1_0, p2_0, p2_1) { return [new i12.ɵDomEventsPlugin(p0_0, p0_1), new i12.ɵKeyEventsPlugin(p1_0), new i12.ɵHammerGesturesPlugin(p2_0, p2_1)]; }, [i11.DOCUMENT, i0.NgZone, i11.DOCUMENT, i11.DOCUMENT, i12.HAMMER_GESTURE_CONFIG]), i0.ɵmpd(4608, i12.EventManager, i12.EventManager, [i12.EVENT_MANAGER_PLUGINS, i0.NgZone]), i0.ɵmpd(135680, i12.ɵDomSharedStylesHost, i12.ɵDomSharedStylesHost, [i11.DOCUMENT]), i0.ɵmpd(4608, i12.ɵDomRendererFactory2, i12.ɵDomRendererFactory2, [i12.EventManager, i12.ɵDomSharedStylesHost]), i0.ɵmpd(5120, i13.AnimationDriver, i14.ɵc, []), i0.ɵmpd(5120, i13.ɵAnimationStyleNormalizer, i14.ɵd, []), i0.ɵmpd(4608, i13.ɵAnimationEngine, i14.ɵb, [i13.AnimationDriver, i13.ɵAnimationStyleNormalizer]), i0.ɵmpd(5120, i0.RendererFactory2, i14.ɵe, [i12.ɵDomRendererFactory2, i13.ɵAnimationEngine, i0.NgZone]), i0.ɵmpd(6144, i12.ɵSharedStylesHost, null, [i12.ɵDomSharedStylesHost]), i0.ɵmpd(4608, i0.Testability, i0.Testability, [i0.NgZone]), i0.ɵmpd(4608, i12.Meta, i12.Meta, [i11.DOCUMENT]), i0.ɵmpd(4608, i12.Title, i12.Title, [i11.DOCUMENT]), i0.ɵmpd(4608, i15.AnimationBuilder, i14.ɵBrowserAnimationBuilder, [i0.RendererFactory2, i12.DOCUMENT]), i0.ɵmpd(4608, i16.HttpXsrfTokenExtractor, i16.ɵg, [i11.DOCUMENT, i0.PLATFORM_ID, i16.ɵe]), i0.ɵmpd(4608, i16.ɵh, i16.ɵh, [i16.HttpXsrfTokenExtractor, i16.ɵf]), i0.ɵmpd(5120, i16.HTTP_INTERCEPTORS, function (p0_0) { return [p0_0]; }, [i16.ɵh]), i0.ɵmpd(4608, i16.ɵd, i16.ɵd, []), i0.ɵmpd(6144, i16.XhrFactory, null, [i16.ɵd]), i0.ɵmpd(4608, i16.HttpXhrBackend, i16.HttpXhrBackend, [i16.XhrFactory]), i0.ɵmpd(6144, i16.HttpBackend, null, [i16.HttpXhrBackend]), i0.ɵmpd(5120, i16.HttpHandler, i16.ɵinterceptingHandler, [i16.HttpBackend, [2, i16.HTTP_INTERCEPTORS]]), i0.ɵmpd(4608, i16.HttpClient, i16.HttpClient, [i16.HttpHandler]), i0.ɵmpd(4608, i17.FormBuilder, i17.FormBuilder, []), i0.ɵmpd(4608, i17.ɵi, i17.ɵi, []), i0.ɵmpd(6144, i18.DIR_DOCUMENT, null, [i11.DOCUMENT]), i0.ɵmpd(4608, i18.Directionality, i18.Directionality, [[2, i18.DIR_DOCUMENT]]), i0.ɵmpd(4608, i19.Platform, i19.Platform, []), i0.ɵmpd(4608, i20.ErrorStateMatcher, i20.ErrorStateMatcher, []), i0.ɵmpd(4608, i21.InteractivityChecker, i21.InteractivityChecker, [i19.Platform]), i0.ɵmpd(4608, i21.FocusTrapFactory, i21.FocusTrapFactory, [i21.InteractivityChecker, i0.NgZone, i11.DOCUMENT]), i0.ɵmpd(136192, i21.AriaDescriber, i21.ARIA_DESCRIBER_PROVIDER_FACTORY, [[3, i21.AriaDescriber], i11.DOCUMENT]), i0.ɵmpd(5120, i21.LiveAnnouncer, i21.LIVE_ANNOUNCER_PROVIDER_FACTORY, [[3, i21.LiveAnnouncer], [2, i21.LIVE_ANNOUNCER_ELEMENT_TOKEN], i11.DOCUMENT]), i0.ɵmpd(5120, i21.FocusMonitor, i21.FOCUS_MONITOR_PROVIDER_FACTORY, [[3, i21.FocusMonitor], i0.NgZone, i19.Platform]), i0.ɵmpd(4608, i22.ErrorService, i22.ErrorService, []), i0.ɵmpd(4608, i23.PostService, i23.PostService, [i16.HttpClient, i22.ErrorService]), i0.ɵmpd(5120, i24.UniqueSelectionDispatcher, i24.ɵa, [[3, i24.UniqueSelectionDispatcher]]), i0.ɵmpd(5120, i25.MatIconRegistry, i25.ICON_REGISTRY_PROVIDER_FACTORY, [[3, i25.MatIconRegistry], [2, i16.HttpClient], i12.DomSanitizer, [2, i11.DOCUMENT]]), i0.ɵmpd(4608, i26.WindowRef, i26.WindowRef, []), i0.ɵmpd(4608, i26.DocumentRef, i26.DocumentRef, []), i0.ɵmpd(4608, i27.MapsAPILoader, i28.LazyMapsAPILoader, [i28.LAZY_MAPS_API_CONFIG, i26.WindowRef, i26.DocumentRef]), i0.ɵmpd(4608, i29.LineService, i29.LineService, [i16.HttpClient, i22.ErrorService]), i0.ɵmpd(4608, i30.ProfileService, i30.ProfileService, [i16.HttpClient, i22.ErrorService]), i0.ɵmpd(5120, i31.ScrollDispatcher, i31.SCROLL_DISPATCHER_PROVIDER_FACTORY, [[3, i31.ScrollDispatcher], i0.NgZone, i19.Platform]), i0.ɵmpd(5120, i31.ViewportRuler, i31.VIEWPORT_RULER_PROVIDER_FACTORY, [[3, i31.ViewportRuler], i19.Platform, i0.NgZone]), i0.ɵmpd(4608, i32.ScrollStrategyOptions, i32.ScrollStrategyOptions, [i31.ScrollDispatcher, i31.ViewportRuler, i0.NgZone]), i0.ɵmpd(5120, i32.OverlayContainer, i32.ɵa, [[3, i32.OverlayContainer], i11.DOCUMENT]), i0.ɵmpd(4608, i32.ɵh, i32.ɵh, [i31.ViewportRuler, i11.DOCUMENT]), i0.ɵmpd(5120, i32.OverlayKeyboardDispatcher, i32.ɵf, [[3, i32.OverlayKeyboardDispatcher], i11.DOCUMENT]), i0.ɵmpd(4608, i32.Overlay, i32.Overlay, [i32.ScrollStrategyOptions, i32.OverlayContainer, i0.ComponentFactoryResolver, i32.ɵh, i32.OverlayKeyboardDispatcher, i0.ApplicationRef, i0.Injector, i0.NgZone, i11.DOCUMENT]), i0.ɵmpd(5120, i32.ɵc, i32.ɵd, [i32.Overlay]), i0.ɵmpd(5120, i33.ActivatedRoute, i33.ɵf, [i33.Router]), i0.ɵmpd(4608, i33.NoPreloading, i33.NoPreloading, []), i0.ɵmpd(6144, i33.PreloadingStrategy, null, [i33.NoPreloading]), i0.ɵmpd(135680, i33.RouterPreloader, i33.RouterPreloader, [i33.Router, i0.NgModuleFactoryLoader, i0.Compiler, i0.Injector, i33.PreloadingStrategy]), i0.ɵmpd(4608, i33.PreloadAllModules, i33.PreloadAllModules, []), i0.ɵmpd(5120, i33.ROUTER_INITIALIZER, i33.ɵi, [i33.ɵg]), i0.ɵmpd(5120, i0.APP_BOOTSTRAP_LISTENER, function (p0_0) { return [p0_0]; }, [i33.ROUTER_INITIALIZER]), i0.ɵmpd(4608, i34.AuthService, i34.AuthService, [i33.Router, i16.HttpClient, i30.ProfileService]), i0.ɵmpd(4608, i35.AuthGuardService, i35.AuthGuardService, [i34.AuthService, i33.Router, i33.ActivatedRoute]), i0.ɵmpd(4608, i36.FLAG_DICTIONARY, i36.FLAG_DICTIONARY, []), i0.ɵmpd(4608, i37.COLOR_DICTIONARY, i37.COLOR_DICTIONARY, []), i0.ɵmpd(512, i11.CommonModule, i11.CommonModule, []), i0.ɵmpd(1024, i0.ErrorHandler, i12.ɵa, []), i0.ɵmpd(1024, i0.NgProbeToken, function () { return [i33.ɵb()]; }, []), i0.ɵmpd(512, i33.ɵg, i33.ɵg, [i0.Injector]), i0.ɵmpd(1024, i0.APP_INITIALIZER, function (p0_0, p1_0) { return [i12.ɵh(p0_0), i33.ɵh(p1_0)]; }, [[2, i0.NgProbeToken], i33.ɵg]), i0.ɵmpd(512, i0.ApplicationInitStatus, i0.ApplicationInitStatus, [[2, i0.APP_INITIALIZER]]), i0.ɵmpd(131584, i0.ApplicationRef, i0.ApplicationRef, [i0.NgZone, i0.ɵConsole, i0.Injector, i0.ErrorHandler, i0.ComponentFactoryResolver, i0.ApplicationInitStatus]), i0.ɵmpd(512, i0.ApplicationModule, i0.ApplicationModule, [i0.ApplicationRef]), i0.ɵmpd(512, i12.BrowserModule, i12.BrowserModule, [[3, i12.BrowserModule]]), i0.ɵmpd(512, i14.BrowserAnimationsModule, i14.BrowserAnimationsModule, []), i0.ɵmpd(1024, i33.ɵa, i33.ɵd, [[3, i33.Router]]), i0.ɵmpd(512, i33.UrlSerializer, i33.DefaultUrlSerializer, []), i0.ɵmpd(512, i33.ChildrenOutletContexts, i33.ChildrenOutletContexts, []), i0.ɵmpd(256, i33.ROUTER_CONFIGURATION, {}, []), i0.ɵmpd(1024, i11.LocationStrategy, i33.ɵc, [i11.PlatformLocation, [2, i11.APP_BASE_HREF], i33.ROUTER_CONFIGURATION]), i0.ɵmpd(512, i11.Location, i11.Location, [i11.LocationStrategy]), i0.ɵmpd(512, i0.Compiler, i0.Compiler, []), i0.ɵmpd(512, i0.NgModuleFactoryLoader, i0.SystemJsNgModuleLoader, [i0.Compiler, [2, i0.SystemJsNgModuleLoaderConfig]]), i0.ɵmpd(1024, i33.ROUTES, function () { return [[{ path: "user", pathMatch: "full" }, { path: "user/:user", component: i38.ProfileComponent }], [{ path: "feed", component: i39.LiveFeedComponent }, { path: "ride-center", component: i40.RegisterRideComponent }, { path: "track", component: i41.TrackPageComponent }, { path: "settings", component: i42.SettingsComponent }, { path: "user", component: i38.ProfileComponent, data: i43.ɵ0, loadChildren: "./profile/profile.module#ProfileModule" }], [{ path: "", redirectTo: "landing-page", pathMatch: "full" }, { path: "landing-page", component: i44.LandingPageComponent }, { path: "home", component: i45.WebAppComponent, canActivate: [i35.AuthGuardService], loadChildren: "./webapp.module#WebAppModule" }, { path: "**", redirectTo: "home", pathMatch: "full" }]]; }, []), i0.ɵmpd(1024, i33.Router, i33.ɵe, [i0.ApplicationRef, i33.UrlSerializer, i33.ChildrenOutletContexts, i11.Location, i0.Injector, i0.NgModuleFactoryLoader, i0.Compiler, i33.ROUTES, i33.ROUTER_CONFIGURATION, [2, i33.UrlHandlingStrategy], [2, i33.RouteReuseStrategy]]), i0.ɵmpd(512, i33.RouterModule, i33.RouterModule, [[2, i33.ɵa], [2, i33.Router]]), i0.ɵmpd(512, i16.HttpClientXsrfModule, i16.HttpClientXsrfModule, []), i0.ɵmpd(512, i16.HttpClientModule, i16.HttpClientModule, []), i0.ɵmpd(512, i17.ɵba, i17.ɵba, []), i0.ɵmpd(512, i17.ReactiveFormsModule, i17.ReactiveFormsModule, []), i0.ɵmpd(512, i18.BidiModule, i18.BidiModule, []), i0.ɵmpd(256, i20.MATERIAL_SANITY_CHECKS, true, []), i0.ɵmpd(512, i20.MatCommonModule, i20.MatCommonModule, [[2, i20.MATERIAL_SANITY_CHECKS]]), i0.ɵmpd(512, i46.MatCardModule, i46.MatCardModule, []), i0.ɵmpd(512, i19.PlatformModule, i19.PlatformModule, []), i0.ɵmpd(512, i47.MatFormFieldModule, i47.MatFormFieldModule, []), i0.ɵmpd(512, i48.MatInputModule, i48.MatInputModule, []), i0.ɵmpd(512, i49.LandingPageModule, i49.LandingPageModule, []), i0.ɵmpd(512, i17.FormsModule, i17.FormsModule, []), i0.ɵmpd(512, i20.MatRippleModule, i20.MatRippleModule, []), i0.ɵmpd(512, i21.A11yModule, i21.A11yModule, []), i0.ɵmpd(512, i50.MatButtonModule, i50.MatButtonModule, []), i0.ɵmpd(512, i51.PostModule, i51.PostModule, []), i0.ɵmpd(512, i52.AgmCoreModule, i52.AgmCoreModule, []), i0.ɵmpd(512, i53.MatButtonToggleModule, i53.MatButtonToggleModule, []), i0.ɵmpd(512, i25.MatIconModule, i25.MatIconModule, []), i0.ɵmpd(512, i20.MatLineModule, i20.MatLineModule, []), i0.ɵmpd(512, i20.MatPseudoCheckboxModule, i20.MatPseudoCheckboxModule, []), i0.ɵmpd(512, i54.MatListModule, i54.MatListModule, []), i0.ɵmpd(512, i55.RideCenterModule, i55.RideCenterModule, []), i0.ɵmpd(512, i56.ProfileModule, i56.ProfileModule, []), i0.ɵmpd(512, i57.TrackPageModule, i57.TrackPageModule, []), i0.ɵmpd(512, i58.PortalModule, i58.PortalModule, []), i0.ɵmpd(512, i31.ScrollDispatchModule, i31.ScrollDispatchModule, []), i0.ɵmpd(512, i32.OverlayModule, i32.OverlayModule, []), i0.ɵmpd(512, i59.MatSidenavModule, i59.MatSidenavModule, []), i0.ɵmpd(512, i60.CdkAccordionModule, i60.CdkAccordionModule, []), i0.ɵmpd(512, i61.MatExpansionModule, i61.MatExpansionModule, []), i0.ɵmpd(512, i62.MatToolbarModule, i62.MatToolbarModule, []), i0.ɵmpd(512, i63.WebAppModule, i63.WebAppModule, []), i0.ɵmpd(512, i1.AppModule, i1.AppModule, []), i0.ɵmpd(256, i16.ɵe, "XSRF-TOKEN", []), i0.ɵmpd(256, i16.ɵf, "X-XSRF-TOKEN", []), i0.ɵmpd(256, i20.MAT_LABEL_GLOBAL_OPTIONS, i49.ɵ0, []), i0.ɵmpd(256, i28.LAZY_MAPS_API_CONFIG, { apiKey: "AIzaSyCiVeucFCv7dkLF9N_VFaHo48b7wb4s8OM" }, []), i0.ɵmpd(256, i59.MAT_DRAWER_DEFAULT_AUTOSIZE, false, [])]); });
export { AppModuleNgFactory as AppModuleNgFactory };
//# sourceMappingURL=D:/Projects/freeraida/assets/app/app.module.ngfactory.js.map