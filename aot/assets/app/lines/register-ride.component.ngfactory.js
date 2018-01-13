/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 
import * as i0 from "./register-ride.component.css.shim.ngstyle";
import * as i1 from "@angular/core";
import * as i2 from "@agm/core/directives/marker";
import * as i3 from "@agm/core/services/managers/marker-manager";
import * as i4 from "../../../node_modules/@agm/core/directives/info-window.ngfactory";
import * as i5 from "@agm/core/directives/info-window";
import * as i6 from "@agm/core/services/managers/info-window-manager";
import * as i7 from "@agm/core/directives/polyline";
import * as i8 from "@agm/core/services/managers/polyline-manager";
import * as i9 from "@agm/core/directives/polyline-point";
import * as i10 from "../../../node_modules/@angular/material/card/typings/index.ngfactory";
import * as i11 from "@angular/material/card";
import * as i12 from "@angular/common";
import * as i13 from "../../../node_modules/@angular/material/button/typings/index.ngfactory";
import * as i14 from "@angular/material/button";
import * as i15 from "@angular/cdk/platform";
import * as i16 from "@angular/cdk/a11y";
import * as i17 from "../../../node_modules/@angular/material/icon/typings/index.ngfactory";
import * as i18 from "@angular/material/icon";
import * as i19 from "../../../node_modules/@agm/core/directives/map.ngfactory";
import * as i20 from "@agm/core/services/google-maps-api-wrapper";
import * as i21 from "@agm/core/services/managers/circle-manager";
import * as i22 from "@agm/core/services/managers/polygon-manager";
import * as i23 from "@agm/core/services/managers/kml-layer-manager";
import * as i24 from "@agm/core/services/managers/data-layer-manager";
import * as i25 from "@agm/core/services/maps-api-loader/maps-api-loader";
import * as i26 from "@agm/core/directives/map";
import * as i27 from "@angular/forms";
import * as i28 from "./register-ride.component";
import * as i29 from "./line.service";
import * as i30 from "../dictionary/flag-dictionary";
var styles_RegisterRideComponent = [i0.styles];
var RenderType_RegisterRideComponent = i1.ɵcrt({ encapsulation: 0, styles: styles_RegisterRideComponent, data: {} });
export { RenderType_RegisterRideComponent as RenderType_RegisterRideComponent };
function View_RegisterRideComponent_1(_l) { return i1.ɵvid(0, [(_l()(), i1.ɵeld(0, 0, null, null, 13, "li", [["class", "route-list-li"]], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ["\n                "])), (_l()(), i1.ɵeld(2, 0, null, null, 1, "i", [["class", "material-icons"]], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ["location_on"])), (_l()(), i1.ɵted(-1, null, ["\n                "])), (_l()(), i1.ɵeld(5, 0, null, null, 1, "p", [], null, null, null, null, null)), (_l()(), i1.ɵted(6, null, ["", " "])), (_l()(), i1.ɵted(-1, null, ["\n                "])), (_l()(), i1.ɵeld(8, 0, null, null, 4, "div", [["class", "list-coordinates"]], null, null, null, null, null)), (_l()(), i1.ɵeld(9, 0, null, null, 1, "p", [["class", "extra-small"]], null, null, null, null, null)), (_l()(), i1.ɵted(10, null, ["", ""])), (_l()(), i1.ɵeld(11, 0, null, null, 1, "p", [["class", "extra-small"]], null, null, null, null, null)), (_l()(), i1.ɵted(12, null, ["", ""])), (_l()(), i1.ɵted(-1, null, ["\n            "]))], null, function (_ck, _v) { var currVal_0 = _v.context.$implicit.name; _ck(_v, 6, 0, currVal_0); var currVal_1 = _v.context.$implicit.lat; _ck(_v, 10, 0, currVal_1); var currVal_2 = _v.context.$implicit.lng; _ck(_v, 12, 0, currVal_2); }); }
function View_RegisterRideComponent_2(_l) { return i1.ɵvid(0, [(_l()(), i1.ɵeld(0, 0, null, null, 15, "agm-marker", [], null, [[null, "markerClick"], [null, "dragEnd"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("markerClick" === en)) {
        var pd_0 = (_co.clickedMarker(_v.context.$implicit, _v.context.index) !== false);
        ad = (pd_0 && ad);
    } if (("dragEnd" === en)) {
        var pd_1 = (_co.markerDragEnd(_v.context.$implicit, $event) !== false);
        ad = (pd_1 && ad);
    } return ad; }, null, null)), i1.ɵdid(1, 1720320, null, 1, i2.AgmMarker, [i3.MarkerManager], { latitude: [0, "latitude"], longitude: [1, "longitude"], draggable: [2, "draggable"] }, { markerClick: "markerClick", dragEnd: "dragEnd" }), i1.ɵqud(603979776, 1, { infoWindow: 1 }), (_l()(), i1.ɵted(-1, null, ["\n                "])), (_l()(), i1.ɵeld(4, 0, null, null, 10, "agm-info-window", [], null, null, null, i4.View_AgmInfoWindow_0, i4.RenderType_AgmInfoWindow)), i1.ɵdid(5, 770048, [[1, 4]], 0, i5.AgmInfoWindow, [i6.InfoWindowManager, i1.ElementRef], null, null), (_l()(), i1.ɵted(-1, 0, ["\n                    "])), (_l()(), i1.ɵeld(7, 0, null, 0, 1, "strong", [], null, null, null, null, null)), (_l()(), i1.ɵted(8, null, ["", ""])), (_l()(), i1.ɵted(-1, 0, ["\n                    "])), (_l()(), i1.ɵeld(10, 0, null, 0, 0, "br", [], null, null, null, null, null)), (_l()(), i1.ɵted(-1, 0, ["\n                    "])), (_l()(), i1.ɵeld(12, 0, null, 0, 1, "a", [["class", "delete"]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.removeMarker(_v.context.$implicit) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), (_l()(), i1.ɵted(-1, null, ["delete"])), (_l()(), i1.ɵted(-1, 0, ["\n                "])), (_l()(), i1.ɵted(-1, null, ["\n            "]))], function (_ck, _v) { var currVal_0 = _v.context.$implicit.lat; var currVal_1 = _v.context.$implicit.lng; var currVal_2 = true; _ck(_v, 1, 0, currVal_0, currVal_1, currVal_2); _ck(_v, 5, 0); }, function (_ck, _v) { var currVal_3 = _v.context.$implicit.name; _ck(_v, 8, 0, currVal_3); }); }
function View_RegisterRideComponent_3(_l) { return i1.ɵvid(0, [(_l()(), i1.ɵeld(0, 0, null, null, 9, "agm-polyline", [["strokeColor", "#6495ED"], ["strokeWeight", "5"]], null, null, null, null, null)), i1.ɵdid(1, 1720320, null, 1, i7.AgmPolyline, [i8.PolylineManager], { editable: [0, "editable"], geodesic: [1, "geodesic"], strokeColor: [2, "strokeColor"], strokeWeight: [3, "strokeWeight"] }, null), i1.ɵqud(603979776, 2, { points: 1 }), (_l()(), i1.ɵted(-1, null, ["\n                "])), (_l()(), i1.ɵeld(4, 0, null, null, 1, "agm-polyline-point", [], null, null, null, null, null)), i1.ɵdid(5, 540672, [[2, 4]], 0, i9.AgmPolylinePoint, [], { latitude: [0, "latitude"], longitude: [1, "longitude"] }, null), (_l()(), i1.ɵted(-1, null, ["\n                "])), (_l()(), i1.ɵeld(7, 0, null, null, 1, "agm-polyline-point", [], null, null, null, null, null)), i1.ɵdid(8, 540672, [[2, 4]], 0, i9.AgmPolylinePoint, [], { latitude: [0, "latitude"], longitude: [1, "longitude"] }, null), (_l()(), i1.ɵted(-1, null, ["\n            "]))], function (_ck, _v) { var currVal_0 = false; var currVal_1 = true; var currVal_2 = "#6495ED"; var currVal_3 = "5"; _ck(_v, 1, 0, currVal_0, currVal_1, currVal_2, currVal_3); var currVal_4 = _v.context.$implicit.org_lat; var currVal_5 = _v.context.$implicit.org_lng; _ck(_v, 5, 0, currVal_4, currVal_5); var currVal_6 = _v.context.$implicit.destination_lat; var currVal_7 = _v.context.$implicit.destination_lng; _ck(_v, 8, 0, currVal_6, currVal_7); }, null); }
export function View_RegisterRideComponent_0(_l) { return i1.ɵvid(0, [(_l()(), i1.ɵeld(0, 0, null, null, 259, "div", [["class", "container"]], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ["\n    "])), (_l()(), i1.ɵted(-1, null, ["\n    "])), (_l()(), i1.ɵted(-1, null, ["\n    "])), (_l()(), i1.ɵeld(4, 0, null, null, 47, "mat-card", [["class", "route-description-container mat-card"]], null, null, null, i10.View_MatCard_0, i10.RenderType_MatCard)), i1.ɵdid(5, 49152, null, 0, i11.MatCard, [], null, null), (_l()(), i1.ɵted(-1, 0, ["\n        "])), (_l()(), i1.ɵeld(7, 0, null, 0, 13, "ul", [], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ["\n            "])), (_l()(), i1.ɵeld(9, 0, null, null, 2, "li", [], null, null, null, null, null)), (_l()(), i1.ɵeld(10, 0, null, null, 0, "input", [["name", "options"], ["type", "radio"]], [[8, "checked", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = ((_co.mapType = "satellite") !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), (_l()(), i1.ɵted(-1, null, ["Satellite"])), (_l()(), i1.ɵted(-1, null, ["\n            "])), (_l()(), i1.ɵeld(13, 0, null, null, 2, "li", [], null, null, null, null, null)), (_l()(), i1.ɵeld(14, 0, null, null, 0, "input", [["name", "options"], ["type", "radio"]], [[8, "checked", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = ((_co.mapType = "terrain") !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), (_l()(), i1.ɵted(-1, null, ["Terrain"])), (_l()(), i1.ɵted(-1, null, ["\n            "])), (_l()(), i1.ɵeld(17, 0, null, null, 2, "li", [], null, null, null, null, null)), (_l()(), i1.ɵeld(18, 0, null, null, 0, "input", [["name", "options"], ["type", "radio"]], [[8, "checked", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = ((_co.mapType = "hybrid") !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), (_l()(), i1.ɵted(-1, null, ["Hybrid"])), (_l()(), i1.ɵted(-1, null, ["\n        "])), (_l()(), i1.ɵted(-1, 0, ["\n        "])), (_l()(), i1.ɵeld(22, 0, null, 0, 0, "br", [], null, null, null, null, null)), (_l()(), i1.ɵted(-1, 0, ["\n        "])), (_l()(), i1.ɵted(-1, 0, ["\n        "])), (_l()(), i1.ɵeld(25, 0, null, 0, 4, "ul", [["class", "marker-list"]], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ["\n            "])), (_l()(), i1.ɵand(16777216, null, null, 1, null, View_RegisterRideComponent_1)), i1.ɵdid(28, 802816, null, 0, i12.NgForOf, [i1.ViewContainerRef, i1.TemplateRef, i1.IterableDiffers], { ngForOf: [0, "ngForOf"] }, null), (_l()(), i1.ɵted(-1, null, ["\n        "])), (_l()(), i1.ɵted(-1, 0, ["\n        "])), (_l()(), i1.ɵeld(31, 0, null, 0, 19, "div", [["class", "list-delete"]], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ["\n            "])), (_l()(), i1.ɵeld(33, 0, null, null, 7, "button", [["class", "list-delete-item mat-icon-button"], ["mat-icon-button", ""]], [[8, "disabled", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.markerDeleteAll() !== false);
        ad = (pd_0 && ad);
    } return ad; }, i13.View_MatButton_0, i13.RenderType_MatButton)), i1.ɵdid(34, 180224, null, 0, i14.MatButton, [i1.ElementRef, i15.Platform, i16.FocusMonitor], null, null), i1.ɵdid(35, 16384, null, 0, i14.MatIconButtonCssMatStyler, [], null, null), (_l()(), i1.ɵted(-1, 0, ["\n                "])), (_l()(), i1.ɵeld(37, 0, null, 0, 2, "mat-icon", [["class", "mat-icon"], ["role", "img"]], null, null, null, i17.View_MatIcon_0, i17.RenderType_MatIcon)), i1.ɵdid(38, 638976, null, 0, i18.MatIcon, [i1.ElementRef, i18.MatIconRegistry, [8, null]], null, null), (_l()(), i1.ɵted(-1, 0, ["delete_sweep"])), (_l()(), i1.ɵted(-1, 0, ["\n            "])), (_l()(), i1.ɵted(-1, null, ["\n            "])), (_l()(), i1.ɵeld(42, 0, null, null, 7, "button", [["class", "list-delete-item mat-icon-button"], ["mat-icon-button", ""]], [[8, "disabled", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.markerDeleteLast() !== false);
        ad = (pd_0 && ad);
    } return ad; }, i13.View_MatButton_0, i13.RenderType_MatButton)), i1.ɵdid(43, 180224, null, 0, i14.MatButton, [i1.ElementRef, i15.Platform, i16.FocusMonitor], null, null), i1.ɵdid(44, 16384, null, 0, i14.MatIconButtonCssMatStyler, [], null, null), (_l()(), i1.ɵted(-1, 0, ["\n                "])), (_l()(), i1.ɵeld(46, 0, null, 0, 2, "mat-icon", [["class", "mat-icon"], ["role", "img"]], null, null, null, i17.View_MatIcon_0, i17.RenderType_MatIcon)), i1.ɵdid(47, 638976, null, 0, i18.MatIcon, [i1.ElementRef, i18.MatIconRegistry, [8, null]], null, null), (_l()(), i1.ɵted(-1, 0, ["delete"])), (_l()(), i1.ɵted(-1, 0, ["\n            "])), (_l()(), i1.ɵted(-1, null, ["\n        "])), (_l()(), i1.ɵted(-1, 0, ["\n    "])), (_l()(), i1.ɵted(-1, null, ["\n    "])), (_l()(), i1.ɵted(-1, null, ["\n    "])), (_l()(), i1.ɵeld(54, 0, null, null, 20, "mat-card", [["class", "map-container mat-card"]], null, null, null, i10.View_MatCard_0, i10.RenderType_MatCard)), i1.ɵdid(55, 49152, null, 0, i11.MatCard, [], null, null), (_l()(), i1.ɵted(-1, 0, ["\n        "])), (_l()(), i1.ɵeld(57, 0, null, 0, 16, "agm-map", [], [[2, "sebm-google-map-container", null]], [[null, "mapClick"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("mapClick" === en)) {
        var pd_0 = (_co.mapClicked($event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, i19.View_AgmMap_0, i19.RenderType_AgmMap)), i1.ɵprd(4608, null, i3.MarkerManager, i3.MarkerManager, [i20.GoogleMapsAPIWrapper, i1.NgZone]), i1.ɵprd(4608, null, i6.InfoWindowManager, i6.InfoWindowManager, [i20.GoogleMapsAPIWrapper, i1.NgZone, i3.MarkerManager]), i1.ɵprd(4608, null, i8.PolylineManager, i8.PolylineManager, [i20.GoogleMapsAPIWrapper, i1.NgZone]), i1.ɵprd(4608, null, i21.CircleManager, i21.CircleManager, [i20.GoogleMapsAPIWrapper, i1.NgZone]), i1.ɵprd(4608, null, i22.PolygonManager, i22.PolygonManager, [i20.GoogleMapsAPIWrapper, i1.NgZone]), i1.ɵprd(4608, null, i23.KmlLayerManager, i23.KmlLayerManager, [i20.GoogleMapsAPIWrapper, i1.NgZone]), i1.ɵprd(4608, null, i24.DataLayerManager, i24.DataLayerManager, [i20.GoogleMapsAPIWrapper, i1.NgZone]), i1.ɵprd(512, null, i20.GoogleMapsAPIWrapper, i20.GoogleMapsAPIWrapper, [i25.MapsAPILoader, i1.NgZone]), i1.ɵdid(66, 770048, null, 0, i26.AgmMap, [i1.ElementRef, i20.GoogleMapsAPIWrapper], { longitude: [0, "longitude"], latitude: [1, "latitude"], disableDefaultUI: [2, "disableDefaultUI"], backgroundColor: [3, "backgroundColor"], mapTypeId: [4, "mapTypeId"] }, { mapClick: "mapClick" }), (_l()(), i1.ɵted(-1, 0, ["\n            "])), (_l()(), i1.ɵand(16777216, null, 0, 1, null, View_RegisterRideComponent_2)), i1.ɵdid(69, 802816, null, 0, i12.NgForOf, [i1.ViewContainerRef, i1.TemplateRef, i1.IterableDiffers], { ngForOf: [0, "ngForOf"] }, null), (_l()(), i1.ɵted(-1, 0, ["\n\n            "])), (_l()(), i1.ɵand(16777216, null, 0, 1, null, View_RegisterRideComponent_3)), i1.ɵdid(72, 802816, null, 0, i12.NgForOf, [i1.ViewContainerRef, i1.TemplateRef, i1.IterableDiffers], { ngForOf: [0, "ngForOf"] }, null), (_l()(), i1.ɵted(-1, 0, ["\n\n        "])), (_l()(), i1.ɵted(-1, 0, ["\n    "])), (_l()(), i1.ɵted(-1, null, ["\n\n    "])), (_l()(), i1.ɵeld(76, 0, null, null, 182, "mat-card", [["class", "route-info-card mat-card"]], null, null, null, i10.View_MatCard_0, i10.RenderType_MatCard)), i1.ɵdid(77, 49152, null, 0, i11.MatCard, [], null, null), (_l()(), i1.ɵted(-1, 0, ["\n        "])), (_l()(), i1.ɵeld(79, 0, null, 0, 178, "form", [["novalidate", ""]], [[2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "submit"], [null, "reset"]], function (_v, en, $event) { var ad = true; if (("submit" === en)) {
        var pd_0 = (i1.ɵnov(_v, 81).onSubmit($event) !== false);
        ad = (pd_0 && ad);
    } if (("reset" === en)) {
        var pd_1 = (i1.ɵnov(_v, 81).onReset() !== false);
        ad = (pd_1 && ad);
    } return ad; }, null, null)), i1.ɵdid(80, 16384, null, 0, i27.ɵbf, [], null, null), i1.ɵdid(81, 540672, null, 0, i27.FormGroupDirective, [[8, null], [8, null]], { form: [0, "form"] }, null), i1.ɵprd(2048, null, i27.ControlContainer, null, [i27.FormGroupDirective]), i1.ɵdid(83, 16384, null, 0, i27.NgControlStatusGroup, [i27.ControlContainer], null, null), (_l()(), i1.ɵted(-1, null, ["\n            "])), (_l()(), i1.ɵeld(85, 0, null, null, 159, "div", [["class", "left-side"]], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ["\n                "])), (_l()(), i1.ɵeld(87, 0, null, null, 11, "div", [["class", "form-group"]], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ["\n                    "])), (_l()(), i1.ɵeld(89, 0, null, null, 1, "label", [["for", "lineName"]], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ["Name of line"])), (_l()(), i1.ɵted(-1, null, ["\n                    "])), (_l()(), i1.ɵeld(92, 0, null, null, 5, "input", [["class", "form-control"], ["formControlName", "lineName"], ["id", "lineName"], ["type", "text"]], [[2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "input"], [null, "blur"], [null, "compositionstart"], [null, "compositionend"]], function (_v, en, $event) { var ad = true; if (("input" === en)) {
        var pd_0 = (i1.ɵnov(_v, 93)._handleInput($event.target.value) !== false);
        ad = (pd_0 && ad);
    } if (("blur" === en)) {
        var pd_1 = (i1.ɵnov(_v, 93).onTouched() !== false);
        ad = (pd_1 && ad);
    } if (("compositionstart" === en)) {
        var pd_2 = (i1.ɵnov(_v, 93)._compositionStart() !== false);
        ad = (pd_2 && ad);
    } if (("compositionend" === en)) {
        var pd_3 = (i1.ɵnov(_v, 93)._compositionEnd($event.target.value) !== false);
        ad = (pd_3 && ad);
    } return ad; }, null, null)), i1.ɵdid(93, 16384, null, 0, i27.DefaultValueAccessor, [i1.Renderer2, i1.ElementRef, [2, i27.COMPOSITION_BUFFER_MODE]], null, null), i1.ɵprd(1024, null, i27.NG_VALUE_ACCESSOR, function (p0_0) { return [p0_0]; }, [i27.DefaultValueAccessor]), i1.ɵdid(95, 671744, null, 0, i27.FormControlName, [[3, i27.ControlContainer], [8, null], [8, null], [2, i27.NG_VALUE_ACCESSOR]], { name: [0, "name"] }, null), i1.ɵprd(2048, null, i27.NgControl, null, [i27.FormControlName]), i1.ɵdid(97, 16384, null, 0, i27.NgControlStatus, [i27.NgControl], null, null), (_l()(), i1.ɵted(-1, null, ["\n                "])), (_l()(), i1.ɵted(-1, null, ["\n                "])), (_l()(), i1.ɵeld(100, 0, null, null, 0, "br", [], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ["\n                "])), (_l()(), i1.ɵeld(102, 0, null, null, 1, "h4", [], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ["Line difficulty"])), (_l()(), i1.ɵted(-1, null, ["\n                "])), (_l()(), i1.ɵeld(105, 0, null, null, 138, "ul", [], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ["\n                    "])), (_l()(), i1.ɵeld(107, 0, null, null, 33, "li", [], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ["\n                        "])), (_l()(), i1.ɵeld(109, 0, null, null, 30, "div", [["class", "option"]], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ["\n                            "])), (_l()(), i1.ɵeld(111, 0, null, null, 27, "div", [["class", "form-group"]], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ["\n                                "])), (_l()(), i1.ɵeld(113, 0, null, null, 1, "h5", [], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ["Danger level"])), (_l()(), i1.ɵted(-1, null, ["\n                                "])), (_l()(), i1.ɵeld(116, 0, null, null, 21, "div", [["class", "option-options"]], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ["\n                                    "])), (_l()(), i1.ɵeld(118, 0, null, null, 0, "input", [["name", "danger-options"], ["type", "radio"]], [[8, "checked", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = ((_co.danger_level = "safe") !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), (_l()(), i1.ɵted(-1, null, ["\n                                    "])), (_l()(), i1.ɵeld(120, 0, null, null, 1, "label", [], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ["Safe"])), (_l()(), i1.ɵted(-1, null, ["\n                                    "])), (_l()(), i1.ɵeld(123, 0, null, null, 0, "input", [["name", "danger-options"], ["type", "radio"]], [[8, "checked", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = ((_co.danger_level = "caution") !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), (_l()(), i1.ɵted(-1, null, ["\n                                    "])), (_l()(), i1.ɵeld(125, 0, null, null, 1, "label", [], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ["Caution"])), (_l()(), i1.ɵted(-1, null, ["\n                                    "])), (_l()(), i1.ɵeld(128, 0, null, null, 0, "input", [["name", "danger-options"], ["type", "radio"]], [[8, "checked", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = ((_co.danger_level = "danger") !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), (_l()(), i1.ɵted(-1, null, ["\n                                    "])), (_l()(), i1.ɵeld(130, 0, null, null, 1, "label", [], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ["Danger"])), (_l()(), i1.ɵted(-1, null, ["\n                                    "])), (_l()(), i1.ɵeld(133, 0, null, null, 0, "input", [["name", "danger-options"], ["type", "radio"]], [[8, "checked", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = ((_co.danger_level = "extreme") !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), (_l()(), i1.ɵted(-1, null, ["\n                                    "])), (_l()(), i1.ɵeld(135, 0, null, null, 1, "label", [], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ["Extreme"])), (_l()(), i1.ɵted(-1, null, ["\n                                "])), (_l()(), i1.ɵted(-1, null, ["\n                            "])), (_l()(), i1.ɵted(-1, null, ["\n                        "])), (_l()(), i1.ɵted(-1, null, ["\n                    "])), (_l()(), i1.ɵted(-1, null, ["\n                    "])), (_l()(), i1.ɵeld(142, 0, null, null, 0, "br", [], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ["\n                    "])), (_l()(), i1.ɵeld(144, 0, null, null, 30, "li", [], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ["\n                        "])), (_l()(), i1.ɵeld(146, 0, null, null, 27, "div", [["class", "option"]], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ["\n                            "])), (_l()(), i1.ɵeld(148, 0, null, null, 1, "h5", [], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ["Level of trees"])), (_l()(), i1.ɵted(-1, null, ["\n                            "])), (_l()(), i1.ɵeld(151, 0, null, null, 21, "div", [["class", "option-options"]], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ["\n                                "])), (_l()(), i1.ɵeld(153, 0, null, null, 0, "input", [["name", "tree_options"], ["type", "radio"]], [[8, "checked", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = ((_co.tree_level = "safe") !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), (_l()(), i1.ɵted(-1, null, ["\n                                "])), (_l()(), i1.ɵeld(155, 0, null, null, 1, "label", [], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ["Safe"])), (_l()(), i1.ɵted(-1, null, ["\n                                "])), (_l()(), i1.ɵeld(158, 0, null, null, 0, "input", [["name", "tree_options"], ["type", "radio"]], [[8, "checked", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = ((_co.tree_level = "caution") !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), (_l()(), i1.ɵted(-1, null, ["\n                                "])), (_l()(), i1.ɵeld(160, 0, null, null, 1, "label", [], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ["Caution"])), (_l()(), i1.ɵted(-1, null, ["\n                                "])), (_l()(), i1.ɵeld(163, 0, null, null, 0, "input", [["name", "tree_options"], ["type", "radio"]], [[8, "checked", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = ((_co.tree_level = "danger") !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), (_l()(), i1.ɵted(-1, null, ["\n                                "])), (_l()(), i1.ɵeld(165, 0, null, null, 1, "label", [], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ["Danger"])), (_l()(), i1.ɵted(-1, null, ["\n                                "])), (_l()(), i1.ɵeld(168, 0, null, null, 0, "input", [["name", "tree_options"], ["type", "radio"]], [[8, "checked", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = ((_co.tree_level = "extreme") !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), (_l()(), i1.ɵted(-1, null, ["\n                                "])), (_l()(), i1.ɵeld(170, 0, null, null, 1, "label", [], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ["Extreme"])), (_l()(), i1.ɵted(-1, null, ["\n                            "])), (_l()(), i1.ɵted(-1, null, ["\n                        "])), (_l()(), i1.ɵted(-1, null, ["\n                    "])), (_l()(), i1.ɵted(-1, null, ["\n                    "])), (_l()(), i1.ɵeld(176, 0, null, null, 0, "br", [], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ["\n                    "])), (_l()(), i1.ɵeld(178, 0, null, null, 30, "li", [], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ["\n                        "])), (_l()(), i1.ɵeld(180, 0, null, null, 27, "div", [["class", "option"]], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ["\n                            "])), (_l()(), i1.ɵeld(182, 0, null, null, 1, "h5", [], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ["Level of rocks"])), (_l()(), i1.ɵted(-1, null, ["\n                            "])), (_l()(), i1.ɵeld(185, 0, null, null, 21, "div", [["class", "option-options"]], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ["\n                                "])), (_l()(), i1.ɵeld(187, 0, null, null, 0, "input", [["name", "rock-options"], ["type", "radio"]], [[8, "checked", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = ((_co.rock_level = "safe") !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), (_l()(), i1.ɵted(-1, null, ["\n                                "])), (_l()(), i1.ɵeld(189, 0, null, null, 1, "label", [], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ["Safe"])), (_l()(), i1.ɵted(-1, null, ["\n                                "])), (_l()(), i1.ɵeld(192, 0, null, null, 0, "input", [["name", "rock-options"], ["type", "radio"]], [[8, "checked", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = ((_co.rock_level = "caution") !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), (_l()(), i1.ɵted(-1, null, ["\n                                "])), (_l()(), i1.ɵeld(194, 0, null, null, 1, "label", [], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ["Caution"])), (_l()(), i1.ɵted(-1, null, ["\n                                "])), (_l()(), i1.ɵeld(197, 0, null, null, 0, "input", [["name", "rock-options"], ["type", "radio"]], [[8, "checked", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = ((_co.rock_level = "danger") !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), (_l()(), i1.ɵted(-1, null, ["\n                                "])), (_l()(), i1.ɵeld(199, 0, null, null, 1, "label", [], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ["Danger"])), (_l()(), i1.ɵted(-1, null, ["\n                                "])), (_l()(), i1.ɵeld(202, 0, null, null, 0, "input", [["name", "rock-options"], ["type", "radio"]], [[8, "checked", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = ((_co.rock_level = "extreme") !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), (_l()(), i1.ɵted(-1, null, ["\n                                "])), (_l()(), i1.ɵeld(204, 0, null, null, 1, "label", [], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ["Extreme"])), (_l()(), i1.ɵted(-1, null, ["\n                            "])), (_l()(), i1.ɵted(-1, null, ["\n                        "])), (_l()(), i1.ɵted(-1, null, ["\n                    "])), (_l()(), i1.ɵted(-1, null, ["\n                    "])), (_l()(), i1.ɵeld(210, 0, null, null, 0, "br", [], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ["\n                    "])), (_l()(), i1.ɵeld(212, 0, null, null, 30, "li", [], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ["\n                        "])), (_l()(), i1.ɵeld(214, 0, null, null, 27, "div", [["class", "option"]], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ["\n                            "])), (_l()(), i1.ɵeld(216, 0, null, null, 1, "h5", [], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ["Level of cliffs"])), (_l()(), i1.ɵted(-1, null, ["\n                            "])), (_l()(), i1.ɵeld(219, 0, null, null, 21, "div", [["class", "option-options"]], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ["\n                                "])), (_l()(), i1.ɵeld(221, 0, null, null, 0, "input", [["name", "cliff-options"], ["type", "radio"]], [[8, "checked", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = ((_co.cliff_level = "safe") !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), (_l()(), i1.ɵted(-1, null, ["\n                                "])), (_l()(), i1.ɵeld(223, 0, null, null, 1, "label", [], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ["Safe"])), (_l()(), i1.ɵted(-1, null, ["\n                                "])), (_l()(), i1.ɵeld(226, 0, null, null, 0, "input", [["name", "cliff-options"], ["type", "radio"]], [[8, "checked", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = ((_co.cliff_level = "caution") !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), (_l()(), i1.ɵted(-1, null, ["\n                                "])), (_l()(), i1.ɵeld(228, 0, null, null, 1, "label", [], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ["Caution"])), (_l()(), i1.ɵted(-1, null, ["\n                                "])), (_l()(), i1.ɵeld(231, 0, null, null, 0, "input", [["name", "cliff-options"], ["type", "radio"]], [[8, "checked", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = ((_co.cliff_level = "danger") !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), (_l()(), i1.ɵted(-1, null, ["\n                                "])), (_l()(), i1.ɵeld(233, 0, null, null, 1, "label", [], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ["Danger"])), (_l()(), i1.ɵted(-1, null, ["\n                                "])), (_l()(), i1.ɵeld(236, 0, null, null, 0, "input", [["name", "cliff-options"], ["type", "radio"]], [[8, "checked", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = ((_co.cliff_level = "extreme") !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), (_l()(), i1.ɵted(-1, null, ["\n                                "])), (_l()(), i1.ɵeld(238, 0, null, null, 1, "label", [], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ["Extreme"])), (_l()(), i1.ɵted(-1, null, ["\n                            "])), (_l()(), i1.ɵted(-1, null, ["\n                        "])), (_l()(), i1.ɵted(-1, null, ["\n                    "])), (_l()(), i1.ɵted(-1, null, ["\n                "])), (_l()(), i1.ɵted(-1, null, ["\n            "])), (_l()(), i1.ɵted(-1, null, ["\n            "])), (_l()(), i1.ɵeld(246, 0, null, null, 10, "div", [["class", "right-side"]], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ["\n                "])), (_l()(), i1.ɵeld(248, 0, null, null, 7, "button", [["class", "list-delete-item mat-icon-button"], ["mat-icon-button", ""]], [[8, "disabled", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.onSubmit() !== false);
        ad = (pd_0 && ad);
    } return ad; }, i13.View_MatButton_0, i13.RenderType_MatButton)), i1.ɵdid(249, 180224, null, 0, i14.MatButton, [i1.ElementRef, i15.Platform, i16.FocusMonitor], null, null), i1.ɵdid(250, 16384, null, 0, i14.MatIconButtonCssMatStyler, [], null, null), (_l()(), i1.ɵted(-1, 0, ["\n                    "])), (_l()(), i1.ɵeld(252, 0, null, 0, 2, "mat-icon", [["class", "mat-icon"], ["role", "img"]], null, null, null, i17.View_MatIcon_0, i17.RenderType_MatIcon)), i1.ɵdid(253, 638976, null, 0, i18.MatIcon, [i1.ElementRef, i18.MatIconRegistry, [8, null]], null, null), (_l()(), i1.ɵted(-1, 0, ["add"])), (_l()(), i1.ɵted(-1, 0, ["\n                "])), (_l()(), i1.ɵted(-1, null, ["\n            "])), (_l()(), i1.ɵted(-1, null, ["\n        "])), (_l()(), i1.ɵted(-1, 0, ["\n    "])), (_l()(), i1.ɵted(-1, null, ["\n"]))], function (_ck, _v) { var _co = _v.component; var currVal_3 = _co.markers; _ck(_v, 28, 0, currVal_3); _ck(_v, 38, 0); _ck(_v, 47, 0); var currVal_7 = _co.lng; var currVal_8 = _co.lat; var currVal_9 = false; var currVal_10 = "#6495ED"; var currVal_11 = _co.mapType; _ck(_v, 66, 0, currVal_7, currVal_8, currVal_9, currVal_10, currVal_11); var currVal_12 = _co.markers; _ck(_v, 69, 0, currVal_12); var currVal_13 = _co.polyCords; _ck(_v, 72, 0, currVal_13); var currVal_21 = _co.lineForm; _ck(_v, 81, 0, currVal_21); var currVal_29 = "lineName"; _ck(_v, 95, 0, currVal_29); _ck(_v, 253, 0); }, function (_ck, _v) { var _co = _v.component; var currVal_0 = (_co.mapType === "satellite"); _ck(_v, 10, 0, currVal_0); var currVal_1 = (_co.mapType === "terrain"); _ck(_v, 14, 0, currVal_1); var currVal_2 = (_co.mapType === "hybrid"); _ck(_v, 18, 0, currVal_2); var currVal_4 = (i1.ɵnov(_v, 34).disabled || null); _ck(_v, 33, 0, currVal_4); var currVal_5 = (i1.ɵnov(_v, 43).disabled || null); _ck(_v, 42, 0, currVal_5); var currVal_6 = true; _ck(_v, 57, 0, currVal_6); var currVal_14 = i1.ɵnov(_v, 83).ngClassUntouched; var currVal_15 = i1.ɵnov(_v, 83).ngClassTouched; var currVal_16 = i1.ɵnov(_v, 83).ngClassPristine; var currVal_17 = i1.ɵnov(_v, 83).ngClassDirty; var currVal_18 = i1.ɵnov(_v, 83).ngClassValid; var currVal_19 = i1.ɵnov(_v, 83).ngClassInvalid; var currVal_20 = i1.ɵnov(_v, 83).ngClassPending; _ck(_v, 79, 0, currVal_14, currVal_15, currVal_16, currVal_17, currVal_18, currVal_19, currVal_20); var currVal_22 = i1.ɵnov(_v, 97).ngClassUntouched; var currVal_23 = i1.ɵnov(_v, 97).ngClassTouched; var currVal_24 = i1.ɵnov(_v, 97).ngClassPristine; var currVal_25 = i1.ɵnov(_v, 97).ngClassDirty; var currVal_26 = i1.ɵnov(_v, 97).ngClassValid; var currVal_27 = i1.ɵnov(_v, 97).ngClassInvalid; var currVal_28 = i1.ɵnov(_v, 97).ngClassPending; _ck(_v, 92, 0, currVal_22, currVal_23, currVal_24, currVal_25, currVal_26, currVal_27, currVal_28); var currVal_30 = (_co.danger_level === "safe"); _ck(_v, 118, 0, currVal_30); var currVal_31 = (_co.danger_level === "caution"); _ck(_v, 123, 0, currVal_31); var currVal_32 = (_co.danger_level === "danger"); _ck(_v, 128, 0, currVal_32); var currVal_33 = (_co.danger_level === "extreme"); _ck(_v, 133, 0, currVal_33); var currVal_34 = (_co.tree_level === "safe"); _ck(_v, 153, 0, currVal_34); var currVal_35 = (_co.tree_level === "caution"); _ck(_v, 158, 0, currVal_35); var currVal_36 = (_co.tree_level === "danger"); _ck(_v, 163, 0, currVal_36); var currVal_37 = (_co.tree_level === "extreme"); _ck(_v, 168, 0, currVal_37); var currVal_38 = (_co.rock_level === "safe"); _ck(_v, 187, 0, currVal_38); var currVal_39 = (_co.rock_level === "caution"); _ck(_v, 192, 0, currVal_39); var currVal_40 = (_co.rock_level === "danger"); _ck(_v, 197, 0, currVal_40); var currVal_41 = (_co.rock_level === "extreme"); _ck(_v, 202, 0, currVal_41); var currVal_42 = (_co.cliff_level === "safe"); _ck(_v, 221, 0, currVal_42); var currVal_43 = (_co.cliff_level === "caution"); _ck(_v, 226, 0, currVal_43); var currVal_44 = (_co.cliff_level === "danger"); _ck(_v, 231, 0, currVal_44); var currVal_45 = (_co.cliff_level === "extreme"); _ck(_v, 236, 0, currVal_45); var currVal_46 = (i1.ɵnov(_v, 249).disabled || null); _ck(_v, 248, 0, currVal_46); }); }
export function View_RegisterRideComponent_Host_0(_l) { return i1.ɵvid(0, [(_l()(), i1.ɵeld(0, 0, null, null, 1, "app-register-ride", [], null, null, null, View_RegisterRideComponent_0, RenderType_RegisterRideComponent)), i1.ɵdid(1, 114688, null, 0, i28.RegisterRideComponent, [i1.ChangeDetectorRef, i29.LineService, i30.FLAG_DICTIONARY], null, null)], function (_ck, _v) { _ck(_v, 1, 0); }, null); }
var RegisterRideComponentNgFactory = i1.ɵccf("app-register-ride", i28.RegisterRideComponent, View_RegisterRideComponent_Host_0, {}, {}, []);
export { RegisterRideComponentNgFactory as RegisterRideComponentNgFactory };
//# sourceMappingURL=D:/Projects/freeraida/assets/app/lines/register-ride.component.ngfactory.js.map