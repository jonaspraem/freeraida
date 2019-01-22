import { NgModule } from "@angular/core";
import { HomePageModule } from "./home-page/home.page.module";
import { ProfilePageModule } from "./profile/profile.page.module";

@NgModule({
    imports: [
        HomePageModule,
        ProfilePageModule,
    ]
})

export class PageModule {}