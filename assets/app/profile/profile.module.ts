import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

import { ProfileService } from "./profile.service";
import { ProfileComponent } from "./profile.component";
import { BioComponent } from "./bio.component";

@NgModule({
    declarations: [
        BioComponent,
        ProfileComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
    ],
    providers: [ ProfileService ]
})

export class ProfileModule {

}