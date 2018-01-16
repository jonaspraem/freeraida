/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 
import * as i0 from "./track.component.css.shim.ngstyle";
import * as i1 from "@angular/core";
import * as i2 from "../../../node_modules/@angular/material/card/typings/index.ngfactory";
import * as i3 from "@angular/material/card";
import * as i4 from "@angular/common";
import * as i5 from "./track.component";
import * as i6 from "../dictionary/color-dictionary";
import * as i7 from "./track.service";
var styles_TrackPageComponent = [i0.styles];
var RenderType_TrackPageComponent = i1.ɵcrt({ encapsulation: 0, styles: styles_TrackPageComponent, data: {} });
export { RenderType_TrackPageComponent as RenderType_TrackPageComponent };
function View_TrackPageComponent_1(_l) { return i1.ɵvid(0, [(_l()(), i1.ɵeld(0, 0, null, null, 0, "div", [], null, null, null, null, null))], null, null); }
function View_TrackPageComponent_2(_l) { return i1.ɵvid(0, [(_l()(), i1.ɵted(-1, null, ["\n            "])), (_l()(), i1.ɵeld(1, 0, null, null, 1, "button", [["class", "btn btn-danger"], ["type", "button"]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.stopTracking() !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), (_l()(), i1.ɵted(-1, null, ["STOP"])), (_l()(), i1.ɵted(-1, null, ["\n        "]))], null, null); }
function View_TrackPageComponent_3(_l) { return i1.ɵvid(0, [(_l()(), i1.ɵted(-1, null, ["\n            "])), (_l()(), i1.ɵeld(1, 0, null, null, 1, "button", [["class", "btn btn-primary"], ["type", "button"]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.startTracking() !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), (_l()(), i1.ɵted(-1, null, ["START TRACKING"])), (_l()(), i1.ɵted(-1, null, ["\n        "]))], null, null); }
export function View_TrackPageComponent_0(_l) { return i1.ɵvid(0, [(_l()(), i1.ɵeld(0, 0, null, null, 0, "img", [["class", "background"]], [[8, "src", 4]], null, null, null, null)), (_l()(), i1.ɵted(-1, null, ["\n"])), (_l()(), i1.ɵeld(2, 0, null, null, 38, "header", [], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ["\n    "])), (_l()(), i1.ɵeld(4, 0, null, null, 35, "mat-card", [["class", "signature-card mat-card"]], null, null, null, i2.View_MatCard_0, i2.RenderType_MatCard)), i1.ɵdid(5, 49152, null, 0, i3.MatCard, [], null, null), (_l()(), i1.ɵted(-1, 0, ["\n        "])), (_l()(), i1.ɵeld(7, 0, null, 0, 0, "img", [["class", "header-img"]], [[8, "src", 4]], null, null, null, null)), (_l()(), i1.ɵted(-1, 0, ["\n        "])), (_l()(), i1.ɵeld(9, 0, null, 0, 0, "hr", [], null, null, null, null, null)), (_l()(), i1.ɵted(-1, 0, ["\n        "])), (_l()(), i1.ɵand(16777216, null, 0, 1, null, View_TrackPageComponent_1)), i1.ɵdid(12, 16384, null, 0, i4.NgIf, [i1.ViewContainerRef, i1.TemplateRef], { ngIf: [0, "ngIf"], ngIfThen: [1, "ngIfThen"], ngIfElse: [2, "ngIfElse"] }, null), (_l()(), i1.ɵted(-1, 0, ["\n        "])), (_l()(), i1.ɵand(0, [["tracking_content", 2]], 0, 0, null, View_TrackPageComponent_2)), (_l()(), i1.ɵted(-1, 0, ["\n        "])), (_l()(), i1.ɵand(0, [["normal_content", 2]], 0, 0, null, View_TrackPageComponent_3)), (_l()(), i1.ɵted(-1, 0, ["\n\n        "])), (_l()(), i1.ɵeld(18, 0, null, 0, 0, "hr", [], null, null, null, null, null)), (_l()(), i1.ɵted(-1, 0, ["\n\n        "])), (_l()(), i1.ɵeld(20, 0, null, 0, 7, "div", [["class", "information"]], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ["\n            "])), (_l()(), i1.ɵeld(22, 0, null, null, 1, "label", [["for", "duration"]], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ["Duration"])), (_l()(), i1.ɵted(-1, null, ["\n            "])), (_l()(), i1.ɵeld(25, 0, null, null, 1, "p", [["id", "duration"]], null, null, null, null, null)), (_l()(), i1.ɵted(26, null, ["", ""])), (_l()(), i1.ɵted(-1, null, ["\n        "])), (_l()(), i1.ɵted(-1, 0, ["\n        "])), (_l()(), i1.ɵeld(29, 0, null, 0, 0, "hr", [], null, null, null, null, null)), (_l()(), i1.ɵted(-1, 0, ["\n        "])), (_l()(), i1.ɵeld(31, 0, null, 0, 7, "div", [["class", "information"]], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ["\n            "])), (_l()(), i1.ɵeld(33, 0, null, null, 1, "label", [["for", "track_results"]], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ["Location nodes tracked"])), (_l()(), i1.ɵted(-1, null, ["\n            "])), (_l()(), i1.ɵeld(36, 0, null, null, 1, "p", [["id", "track_results"]], null, null, null, null, null)), (_l()(), i1.ɵted(37, null, ["", ""])), (_l()(), i1.ɵted(-1, null, ["\n        "])), (_l()(), i1.ɵted(-1, 0, ["\n    "])), (_l()(), i1.ɵted(-1, null, ["\n"])), (_l()(), i1.ɵted(-1, null, ["\n"]))], function (_ck, _v) { var _co = _v.component; var currVal_2 = _co.isTracking; var currVal_3 = i1.ɵnov(_v, 14); var currVal_4 = i1.ɵnov(_v, 16); _ck(_v, 12, 0, currVal_2, currVal_3, currVal_4); }, function (_ck, _v) { var _co = _v.component; var currVal_0 = i1.ɵinlineInterpolate(1, "", _co.descent, ""); _ck(_v, 0, 0, currVal_0); var currVal_1 = i1.ɵinlineInterpolate(1, "", _co.track_header, ""); _ck(_v, 7, 0, currVal_1); var currVal_5 = _co.duration; _ck(_v, 26, 0, currVal_5); var currVal_6 = _co.tracked_line.locations.length; _ck(_v, 37, 0, currVal_6); }); }
export function View_TrackPageComponent_Host_0(_l) { return i1.ɵvid(0, [(_l()(), i1.ɵeld(0, 0, null, null, 1, "app-track-page", [], null, null, null, View_TrackPageComponent_0, RenderType_TrackPageComponent)), i1.ɵdid(1, 49152, null, 0, i5.TrackPageComponent, [i6.COLOR_DICTIONARY, i7.TrackService], null, null)], null, null); }
var TrackPageComponentNgFactory = i1.ɵccf("app-track-page", i5.TrackPageComponent, View_TrackPageComponent_Host_0, {}, {}, []);
export { TrackPageComponentNgFactory as TrackPageComponentNgFactory };
//# sourceMappingURL=D:/Projects/freeraida/assets/app/tracker/track.component.ngfactory.js.map