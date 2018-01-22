import { NgModule } from "@angular/core";

import { LineHistoryComponent } from "./line-history.component";
import { TrackedLineItemComponent } from "./list-items/tracked/tracked-line.component";
import { CommonModule } from "@angular/common";
import { LineHistoryService } from "./line-history.service";
import { LineItemComponent } from "./list-items/lines/line-item.component";
import { LineModule } from "../line.module";

// Material design
import { MatExpansionModule } from '@angular/material';
import { MatListModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material';
import { MatIconModule } from '@angular/material';

@NgModule({
    declarations: [
        LineHistoryComponent,
        TrackedLineItemComponent,
        LineItemComponent,
    ],
    imports: [
        CommonModule,
        MatExpansionModule,
        LineModule,
        MatListModule,
        MatFormFieldModule,
        MatIconModule
    ],
    providers: [
        LineHistoryService
    ],
    exports: [
        LineHistoryComponent
    ]
})

export class RidesModule {}