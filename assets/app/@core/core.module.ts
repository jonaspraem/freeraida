import { NgModule, Optional, SkipSelf } from "@angular/core";
import { AuthenticationService } from "./services/authentication.service";
import { AuthGuardService } from "./services/auth-guard.service";

@NgModule({
    providers: [
        AuthenticationService,
        AuthGuardService,
    ]
})

export class CoreModule {
    constructor(@Optional() @SkipSelf() core: CoreModule) {
        if (core) {
            throw new Error('Core module already injected');
        }
    }
}