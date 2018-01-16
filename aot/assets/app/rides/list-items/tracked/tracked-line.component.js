import { Component, EventEmitter, Input, Output } from "@angular/core";
import { TrackedLine } from "../../../objects/models/tracked-line.model";
var TrackedLineItemComponent = /** @class */ (function () {
    function TrackedLineItemComponent() {
        this.deleteEvent = new EventEmitter();
    }
    TrackedLineItemComponent.prototype.onDelete = function () {
        this.deleteEvent.emit(this.line._id);
    };
    TrackedLineItemComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-tracked-line-item',
                    templateUrl: './tracked-line.component.html',
                    styleUrls: ['./tracked-line.component.css']
                },] },
    ];
    /** @nocollapse */
    TrackedLineItemComponent.ctorParameters = function () { return []; };
    TrackedLineItemComponent.propDecorators = {
        "deleteEvent": [{ type: Output },],
        "line": [{ type: Input },],
    };
    return TrackedLineItemComponent;
}());
export { TrackedLineItemComponent };
//# sourceMappingURL=D:/Projects/freeraida/assets/app/rides/list-items/tracked/tracked-line.component.js.map