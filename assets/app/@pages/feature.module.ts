import { NgModule } from "@angular/core";
import { HomePageComponent } from "./home-page/home-page.component";

@NgModule({
    declarations: [
        HomePageComponent
    ],
    exports: [
        HomePageComponent
    ]
})

export class FeatureModule {}