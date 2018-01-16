import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

// Material design
import { MatButtonModule, MatCardModule, MatFormFieldModule } from "@angular/material";

import { ProfileService } from "./profile.service";
import { ProfileComponent } from "./profile.component";
import { profileRouting } from "./profile.routing";
import { PostModule } from "../posts/post.module";
import { LineModule } from "../lines/line.module";
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
        // profileRouting,
        PostModule,
        MatCardModule,
        LineModule,
        MatFormFieldModule,
        MatButtonModule,
    ],
    providers: [ ProfileService ]
})

export class ProfileModule {}