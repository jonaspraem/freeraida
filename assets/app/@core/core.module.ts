import { NgModule } from "@angular/core";
import { AuthenticationService } from "./services/authentication.service";

@NgModule({
    providers: [
        AuthenticationService
    ]
})

export class CoreModule {}