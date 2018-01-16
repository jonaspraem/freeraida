import { NgModule } from "@angular/core";
import { TrackPageComponent } from "./track.component";
import { MatCardModule } from "@angular/material";
import { CommonModule } from "@angular/common";
import { TrackService } from "./track.service";
var TrackPageModule = /** @class */ (function () {
    function TrackPageModule() {
    }
    TrackPageModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        TrackPageComponent
                    ],
                    imports: [
                        CommonModule,
                        MatCardModule,
                    ],
                    providers: [
                        TrackService
                    ]
                },] },
    ];
    /** @nocollapse */
    TrackPageModule.ctorParameters = function () { return []; };
    return TrackPageModule;
}());
export { TrackPageModule };
//# sourceMappingURL=D:/Projects/freeraida/assets/app/tracker/track.module.js.map