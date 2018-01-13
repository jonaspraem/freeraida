import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { AgmCoreModule } from "@agm/core";
import { FormsModule } from '@angular/forms';
import { MatCardModule, MatButtonModule, MatButtonToggleModule, MatIconModule, MatListModule, MatInputModule } from '@angular/material';
import { RegisterRideComponent } from "./register-ride.component";
import { MapContentComponent } from "./map-content";
import { LineService } from "./line.service";
import { LineHistoryComponent } from "./line-history.component";
var RideCenterModule = /** @class */ (function () {
    function RideCenterModule() {
    }
    RideCenterModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        RegisterRideComponent,
                        MapContentComponent,
                        LineHistoryComponent
                    ],
                    imports: [
                        CommonModule,
                        ReactiveFormsModule,
                        FormsModule,
                        AgmCoreModule.forRoot({
                            apiKey: 'AIzaSyCiVeucFCv7dkLF9N_VFaHo48b7wb4s8OM'
                        }),
                        MatCardModule,
                        MatButtonModule,
                        MatButtonToggleModule,
                        MatIconModule,
                        MatListModule,
                        MatInputModule
                    ],
                    exports: [
                        LineHistoryComponent
                    ],
                    providers: [LineService]
                },] },
    ];
    /** @nocollapse */
    RideCenterModule.ctorParameters = function () { return []; };
    return RideCenterModule;
}());
export { RideCenterModule };
//# sourceMappingURL=D:/Projects/freeraida/assets/app/lines/ride-center.module.js.map