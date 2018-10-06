import { NgModule } from "@angular/core";
import { SidenavComponent } from "./sidenav/sidenav.component";
import { RouterModule } from "@angular/router";

@NgModule({
    declarations: [
        SidenavComponent,
    ],
    exports: [
        SidenavComponent,
    ],
    imports: [
        RouterModule,
    ]
})

export class FeatureModule {}