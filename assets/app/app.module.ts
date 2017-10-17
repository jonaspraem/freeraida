import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { HttpModule } from "@angular/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Material design
import { MatSidenavModule, MatCardModule } from '@angular/material';

import { AppComponent } from './app.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { AuthenticationComponent } from "./auth/authentication.component";
import { HeaderComponent } from "./header/header.component";
import { routing } from "./app.routing";
import { AuthService } from "./auth/auth.service";
import { ErrorComponent } from "./errors/error.component";
import { ErrorService } from "./errors/error.service";
import { ProfileModule } from "./profile/profile.module";
import { SidenavContentComponent } from "./sidenav/sidenav-content.component";
import { PostModule } from "./posts/post.module";

@NgModule({
    declarations: [
        AppComponent,
        SidenavComponent,
        SidenavContentComponent,
        AuthenticationComponent,
        HeaderComponent,
        ErrorComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        routing,
        HttpModule,
        ProfileModule,
        MatSidenavModule,
        MatCardModule,
        PostModule
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    providers: [AuthService, ErrorService],
    bootstrap: [AppComponent]
})
export class AppModule { }
