import { NgModule } from "@angular/core";
import { AssetButtonSubmit } from "./button-submit/button-submit.component";
import { AssetButtonSubmitInverted } from "./button-submit-inverted/button-submit-inverted.component";
import { AssetButtonCancel } from "./button-cancel/button-cancel.component";

@NgModule({
    declarations: [
        AssetButtonSubmit,
        AssetButtonSubmitInverted,
        AssetButtonCancel
    ], exports: [
        AssetButtonSubmit,
        AssetButtonSubmitInverted,
        AssetButtonCancel
    ]
})

export class AssetsModule {}