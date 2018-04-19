import { NgModule } from "@angular/core";
import { LandingPageComponent } from "./landing-page.component";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import {
    MAT_PLACEHOLDER_GLOBAL_OPTIONS, MatCardModule, MatFormFieldModule, MatInputModule, MatSidenavModule,
    MatTabsModule, MatToolbarModule
} from "@angular/material";
import { AuthPromptComponent } from "./auth-prompt/auth-prompt.component";
import { LoginPromptComponent } from "./auth-prompt/login-prompt/login-prompt.component";
import { RegisterPromptComponent } from "./auth-prompt/register-prompt/register-prompt.component";
import { LandingPageHeaderComponent } from "./landing-page-header/landing-page-header.component";
import { AssetsModule } from "../@shared/assets/assets.module";

@NgModule({
    declarations: [
        LandingPageHeaderComponent,
        LandingPageComponent,
        AuthPromptComponent,
        LoginPromptComponent,
        RegisterPromptComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        AssetsModule,
        MatToolbarModule,
        MatSidenavModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatTabsModule
    ]
})

export class LandingPageModule {}