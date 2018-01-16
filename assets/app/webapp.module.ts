import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

import { webappRouting } from "./webapp.routing";
import { ProfileModule } from "./profile/profile.module";
import { LineModule } from "./lines/line.module";
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
import { UserOptionsDropdownComponent } from "./header/user-options/user-options-dropdown.component";
import { TrackPageModule } from "./tracker/track.module";
import { RidesModule } from "./rides/rides.module";

@NgModule({
    declarations: [
        WebAppComponent,
        HeaderComponent,
        SidenavComponent,
        UserOptionsDropdownComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        webappRouting,
        ProfileModule,
        LineModule,
        TrackPageModule,
        PostModule,
        RidesModule,

        // Material design modules:
        MatSidenavModule,
        MatCardModule,
        MatExpansionModule,
        MatIconModule,
        MatListModule,
        MatToolbarModule,
        MatButtonToggleModule
    ],
    exports: [
        WebAppComponent,
    ]
})

export class WebAppModule {

}