import { NgModule } from "@angular/core";
import { HomePageComponent } from "./home-page/home-page.component";
import { FeatureModule } from "../features/features.module";
import { HomePageModule } from "./home-page/home-page.module";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

@NgModule({
    imports: [
        HomePageModule,
        FeatureModule,
    ]
})

export class PageModule {}