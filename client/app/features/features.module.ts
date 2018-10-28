import { NgModule } from "@angular/core";
import { SidenavComponent } from "./sidenav/sidenav.component";
import { RouterModule } from "@angular/router";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome"; // TODO

@NgModule({
    declarations: [
        SidenavComponent,
    ],
    exports: [
        SidenavComponent,
    ],
    imports: [
        RouterModule,
        FontAwesomeModule,
    ]
})

export class FeatureModule {}