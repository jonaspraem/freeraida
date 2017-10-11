import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

import { ProfileService } from "./profile.service";
import { ProfileComponent } from "./profile.component";
import { BioComponent } from "./bio.component";
import { profileRouting } from "./profile.routing";

@NgModule({
    declarations: [
        BioComponent,
        ProfileComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        profileRouting,
    ],
    providers: [ ProfileService ]
})

export class ProfileModule {

}