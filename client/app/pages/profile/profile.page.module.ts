import { NgModule } from "@angular/core";
import { ProfilePageComponent } from "./profile.page.component";
import { ProfileHeaderComponent } from "../../features/profile-header/profile-header.component";
import { SharedModule } from "../../shared/shared.module";

@NgModule({
    declarations: [
        ProfilePageComponent,
        ProfileHeaderComponent
    ],
    imports: [
      SharedModule
    ],
    exports: [
        ProfilePageComponent
    ],
    entryComponents: [
        ProfilePageComponent
    ]
})

export class ProfilePageModule {

}