import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

import { webappRouting } from "./webapp.routing";
import { ProfileModule } from "./profile/profile.module";
import { RideCenterModule } from "./lines/ride-center.module";
import { SidenavComponent } from "./sidenav/sidenav.component";
import { HeaderComponent } from "./header/header.component";
import {
    MatButtonToggleModule, MatExpansionModule, MatIconModule, MatListModule,
    MatToolbarModule,
    MatCardModule,
    MatSidenavModule
} from "@angular/material";
import { PostModule } from "./posts/post.module";
import { WebAppComponent } from "./webapp.component";

@NgModule({
    declarations: [
        WebAppComponent,
        HeaderComponent,
        SidenavComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        webappRouting,
        ProfileModule,
        RideCenterModule,
        PostModule,

        // Material design modules:
        MatSidenavModule,
        MatCardModule,
        MatExpansionModule,
        MatIconModule,
        MatListModule,
        MatToolbarModule,
        MatButtonToggleModule
    ]
})

export class WebAppModule {

}