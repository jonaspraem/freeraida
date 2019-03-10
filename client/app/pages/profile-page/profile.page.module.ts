import { NgModule } from "@angular/core";
import { ProfilePageComponent } from "./profile.page.component";
import { ProfileHeaderComponent } from "../../components/profile-header/profile-header.component";
import { SharedModule } from "../../shared/shared.module";
import { PostModule } from "../../components/post-module/post.module";
import { LineModule } from "../../components/line-module/line.module";
import { ProfileInfoCardComponent } from "../../components/profile-module/profile-info-card/profile-info-card.component";

@NgModule({
    declarations: [
        ProfilePageComponent,
        ProfileHeaderComponent,
        ProfileInfoCardComponent
    ],
    imports: [
        SharedModule,
        PostModule,
        LineModule
    ],
    exports: [
        ProfilePageComponent
    ],
    entryComponents: [
        ProfilePageComponent
    ]
})

export class ProfilePageModule {}
