import { NgModule } from "@angular/core";
import { HomePageModule } from "./home-page/home.page.module";
import { ProfilePageModule } from "./profile-page/profile.page.module";

@NgModule({
    imports: [
        HomePageModule,
        ProfilePageModule,
    ],
    exports: [
        ProfilePageModule,
    ],
})

export class PageModule {}