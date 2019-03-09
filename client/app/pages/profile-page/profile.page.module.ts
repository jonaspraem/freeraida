import { NgModule } from "@angular/core";
import { ProfilePageComponent } from "./profile.page.component";
import { ProfileHeaderComponent } from "../../components/profile-header/profile-header.component";
import { SharedModule } from "../../shared/shared.module";
import { PostModule } from "../../components/post-module/post.module";
import { LineModule } from "../../components/line-module/line.module";

@NgModule({
    declarations: [
        ProfilePageComponent,
        ProfileHeaderComponent,
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
