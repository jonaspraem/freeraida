import { NgModule } from "@angular/core";
import { ProfilePageComponent } from "./profile.page.component";
import { ProfileHeaderComponent } from "../../components/profile-header/profile-header.component";
import { SharedModule } from "../../shared/shared.module";
import { PostModule } from "../../components/post-module/post.module";
import { LineModule } from "../../components/line-module/line.module";
import { ProfileInfoCardComponent } from "../../components/profile-module/profile-info-card/profile-info-card.component";
import { ProfilePageService } from "./profile-page.service";
import { profileRoutes } from "./profile.routing";
import { ProfileTabLineHistoryComponent } from "./tabs/profile-tab-line-history.component";
import { ProfileTabHomeComponent } from "./tabs/profile-tab-home.component";
import { RouterModule } from "@angular/router";

@NgModule({
    declarations: [
        ProfilePageComponent,
        ProfileHeaderComponent,
        ProfileInfoCardComponent,
        ProfileTabLineHistoryComponent,
        ProfileTabHomeComponent
    ],
    imports: [
        profileRoutes,
        SharedModule,
        PostModule,
        LineModule,
    ],
    exports: [
        ProfilePageComponent,
        RouterModule
    ],
    entryComponents: [
        ProfilePageComponent
    ],
    providers: [
        ProfilePageService
    ]
})

export class ProfilePageModule {}
