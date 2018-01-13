import { NgModule } from "@angular/core";
import { LandingPageComponent } from "./landing-page.component";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { MAT_PLACEHOLDER_GLOBAL_OPTIONS, MatCardModule, MatFormFieldModule, MatInputModule } from "@angular/material";
var ɵ0 = { float: 'auto' };
var LandingPageModule = /** @class */ (function () {
    function LandingPageModule() {
    }
    LandingPageModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        LandingPageComponent
                    ],
                    imports: [
                        CommonModule,
                        ReactiveFormsModule,
                        MatCardModule,
                        MatFormFieldModule,
                        MatInputModule,
                    ],
                    providers: [{ provide: MAT_PLACEHOLDER_GLOBAL_OPTIONS, useValue: ɵ0 }]
                },] },
    ];
    /** @nocollapse */
    LandingPageModule.ctorParameters = function () { return []; };
    return LandingPageModule;
}());
export { LandingPageModule };
export { ɵ0 };
//# sourceMappingURL=D:/Projects/freeraida/assets/app/landing-page/landing-page.module.js.map