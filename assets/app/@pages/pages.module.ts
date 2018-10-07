import { NgModule } from "@angular/core";
import { HomePageComponent } from "./home-page/home-page.component";
import { FeatureModule } from "../@features/features.module";

@NgModule({
    declarations: [
        HomePageComponent
    ],
    exports: [
        HomePageComponent
    ],
    imports: [
        FeatureModule,
    ]
})

export class PageModule {}