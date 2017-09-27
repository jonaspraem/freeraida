import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

//Components
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ProfileComponent } from './profile/profile.component';
import { AccountPanelComponent } from './account-panel/account-panel.component';
import { MessageComponent } from "./messages/message.component";

// Google material design
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MdButtonModule, MdCheckboxModule} from '@angular/material';
import {MessageListComponent} from "./messages/message-list.component";
import {MessageInputComponent} from "./messages/message-input.component";
import {MessagesComponent} from "./messages/messages.component";
import {AuthenticationComponent} from "./auth/authentication.component";
import {HeaderComponent} from "./header.component";
import {routing} from "./app.routing";
import {LogoutComponent} from "./auth/logout.component";
import {SignInComponent} from "./auth/sign-in.component";
import {SignUpComponent} from "./auth/sign-up.component";

@NgModule({
    declarations: [
        AppComponent,
        SidebarComponent,
        ProfileComponent,
        AccountPanelComponent,
        MessageComponent,
        MessageListComponent,
        MessageInputComponent,
        MessagesComponent,
        AuthenticationComponent,
        HeaderComponent,
        LogoutComponent,
        SignInComponent,
        SignUpComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MdButtonModule,
        MdCheckboxModule,
        FormsModule,
        routing,
        ReactiveFormsModule
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
