import { NgModule } from "@angular/core";
import { ProfileCardComponent } from "./profile-card/profile-card.component";
import { ProfileInfoCardComponent } from "./profile-info-card/profile-info-card.component";
import { ProfileHeaderComponent } from "./profile-header/profile-header.component";
import { CommonModule } from "@angular/common";

@NgModule({
    declarations: [
        ProfileCardComponent,
        ProfileInfoCardComponent,
        ProfileHeaderComponent
    ],
    exports: [
        ProfileCardComponent,
        ProfileInfoCardComponent,
        ProfileHeaderComponent
    ],
    imports: [
        CommonModule
    ]
})

export class ProfileModule {}