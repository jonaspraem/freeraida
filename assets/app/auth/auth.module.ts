import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

import { LogoutComponent } from "./logout.component";
import { SignInComponent } from "./sign-in.component";
import { SignUpComponent } from "./sign-up.component";
import { authRouting } from "./auth.routing";

@NgModule({
    declarations: [
        LogoutComponent,
        SignInComponent,
        SignUpComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        authRouting
    ]
})

export class AuthModule {

}