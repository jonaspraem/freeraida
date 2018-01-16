import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule, MatCardModule, MatFormFieldModule } from "@angular/material";
import { ProfileService } from "./profile.service";
import { ProfileComponent } from "./profile.component";
import { PostModule } from "../posts/post.module";
import { LineModule } from "../lines/line.module";
import { SettingsComponent } from "./settings/settings.component";
var ProfileModule = /** @class */ (function () {
    function ProfileModule() {
    }
    ProfileModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        ProfileComponent,
                        SettingsComponent
                    ],
                    imports: [
                        CommonModule,
                        ReactiveFormsModule,
                        FormsModule,
                        PostModule,
                        MatCardModule,
                        LineModule,
                        MatFormFieldModule,
                        MatButtonModule,
                    ],
                    providers: [ProfileService]
                },] },
    ];
    /** @nocollapse */
    ProfileModule.ctorParameters = function () { return []; };
    return ProfileModule;
}());
export { ProfileModule };
//# sourceMappingURL=D:/Projects/freeraida/assets/app/profile/profile.module.js.map