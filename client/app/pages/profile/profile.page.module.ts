import { NgModule } from "@angular/core";
import { ProfilePageComponent } from "./profile.page.component";
import { ProfileHeaderComponent } from "../../features/profile-header/profile-header.component";

@NgModule({
    declarations: [
        ProfilePageComponent,
        ProfileHeaderComponent
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