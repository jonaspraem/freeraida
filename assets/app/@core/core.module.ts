import { NgModule } from "@angular/core";
import { AuthenticationService } from "./services/authentication.service";
import { AuthGuardService } from "./services/auth-guard.service";

@NgModule({
    providers: [
        AuthenticationService,
        AuthGuardService,
    ]
})

export class CoreModule {}