import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

// Material design
import { MatCardModule } from "@angular/material";

import { ProfileService } from "./profile.service";
import { ProfileComponent } from "./profile.component";
import { profileRouting } from "./profile.routing";
import { PostModule } from "../posts/post.module";
import { RideCenterModule } from "../lines/ride-center.module";
import { SettingsComponent } from "./settings/settings.component";

@NgModule({
    declarations: [
        ProfileComponent,
        SettingsComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        profileRouting,
        PostModule,
        MatCardModule,
        RideCenterModule
    ],
    providers: [ ProfileService ]
})

export class ProfileModule {

}