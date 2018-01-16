import { NgModule } from "@angular/core";
import { RidesComponent } from "./rides.component";
import { TrackedLineItemComponent } from "./list-items/tracked/tracked-line.component";
import { CommonModule } from "@angular/common";
import { RidesService } from "./rides.service";
import { LineItemComponent } from "./list-items/lines/line-item.component";
import { LineModule } from "../lines/line.module";
import { MatExpansionModule } from '@angular/material';
import { MatListModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material';
import { MatIconModule } from '@angular/material';
var RidesModule = /** @class */ (function () {
    function RidesModule() {
    }
    RidesModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        RidesComponent,
                        TrackedLineItemComponent,
                        LineItemComponent,
                    ],
                    imports: [
                        CommonModule,
                        MatExpansionModule,
                        LineModule,
                        MatListModule,
                        MatFormFieldModule,
                        MatIconModule
                    ],
                    providers: [
                        RidesService
                    ],
                    exports: [
                        RidesComponent
                    ]
                },] },
    ];
    /** @nocollapse */
    RidesModule.ctorParameters = function () { return []; };
    return RidesModule;
}());
export { RidesModule };
//# sourceMappingURL=D:/Projects/freeraida/assets/app/rides/rides.module.js.map