import { NgModule } from "@angular/core";
import { SidenavComponent } from "./sidenav/sidenav.component";

@NgModule({
    declarations: [
        SidenavComponent,
    ],
    exports: [
        SidenavComponent,
    ]
})

export class FeatureModule {}