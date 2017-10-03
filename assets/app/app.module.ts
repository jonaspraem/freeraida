import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ProfileComponent } from './profile/profile.component';
import { AccountPanelComponent } from './account-panel/account-panel.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthenticationComponent } from "./auth/authentication.component";
import { HeaderComponent } from "./header.component";
import { routing } from "./app.routing";
import { HttpModule } from "@angular/http";
import { AuthService } from "./auth/auth.service";
import { ErrorComponent } from "./errors/error.component";
import { ErrorService } from "./errors/error.service";
import { MessageModule } from "./messages/message.module";

@NgModule({
    declarations: [
        AppComponent,
        SidebarComponent,
        ProfileComponent,
        AccountPanelComponent,
        AuthenticationComponent,
        HeaderComponent,
        ErrorComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        routing,
        HttpModule,
        MessageModule
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    providers: [AuthService, ErrorService],
    bootstrap: [AppComponent]
})
export class AppModule { }
