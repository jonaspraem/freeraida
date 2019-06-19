import { NgModule } from "@angular/core";
import { ProfilePageComponent } from "./profile.page.component";
import { SharedModule } from "../../shared/shared.module";
import { ProfilePageService } from "./profile-page.service";
import { profileRoutes } from "./profile.routing";
import { ProfileTabLineHistoryComponent } from "./tabs/profile-tab-line-history.component";
import { ProfileTabHomeComponent } from "./tabs/profile-tab-home.component";
import { RouterModule } from "@angular/router";
import { PostModule } from "../../shared-modules/post-module/post.module";
import { LineModule } from "../../shared-modules/line-module/line.module";
import { ProfileModule } from "../../shared-modules/profile-module/profile.module";

@NgModule({
    declarations: [
        ProfilePageComponent,
        ProfileTabLineHistoryComponent,
        ProfileTabHomeComponent
    ],
    imports: [
        profileRoutes,
        SharedModule,
        PostModule,
        LineModule,
        ProfileModule,
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
