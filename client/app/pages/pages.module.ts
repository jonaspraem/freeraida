import { NgModule } from "@angular/core";
import { FeatureModule } from "../features/features.module";
import { HomePageModule } from "./home-page/home.page.module";
import { ProfilePageModule } from "./profile/profile.page.module";

@NgModule({
    imports: [
        HomePageModule,
        ProfilePageModule,
        FeatureModule,
    ]
})

export class PageModule {}