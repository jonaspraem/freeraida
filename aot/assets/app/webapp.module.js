import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { webappRouting } from "./webapp.routing";
import { ProfileModule } from "./profile/profile.module";
import { RideCenterModule } from "./lines/ride-center.module";
import { SidenavComponent } from "./sidenav/sidenav.component";
import { HeaderComponent } from "./header/header.component";
import { MatButtonToggleModule, MatExpansionModule, MatIconModule, MatListModule, MatToolbarModule, MatCardModule, MatSidenavModule } from "@angular/material";
import { PostModule } from "./posts/post.module";
import { WebAppComponent } from "./webapp.component";
import { UserOptionsDropdownComponent } from "./header/user-options/user-options-dropdown.component";
import { TrackPageModule } from "./tracker/track-page.module";
var WebAppModule = /** @class */ (function () {
    function WebAppModule() {
    }
    WebAppModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        WebAppComponent,
                        HeaderComponent,
                        SidenavComponent,
                        UserOptionsDropdownComponent
                    ],
                    imports: [
                        CommonModule,
                        ReactiveFormsModule,
                        webappRouting,
                        ProfileModule,
                        RideCenterModule,
                        TrackPageModule,
                        PostModule,
                        MatSidenavModule,
                        MatCardModule,
                        MatExpansionModule,
                        MatIconModule,
                        MatListModule,
                        MatToolbarModule,
                        MatButtonToggleModule
                    ],
                    exports: [
                        WebAppComponent,
                    ]
                },] },
    ];
    /** @nocollapse */
    WebAppModule.ctorParameters = function () { return []; };
    return WebAppModule;
}());
export { WebAppModule };
//# sourceMappingURL=D:/Projects/freeraida/assets/app/webapp.module.js.map