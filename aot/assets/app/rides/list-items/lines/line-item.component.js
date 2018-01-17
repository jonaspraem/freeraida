import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Line } from "../../../objects/models/line.model";
import { COLOR_DICTIONARY } from "../../../dictionary/color-dictionary";
var LineItemComponent = /** @class */ (function () {
    function LineItemComponent(color_dictionary) {
        this.color_dictionary = color_dictionary;
        this.deleteEvent = new EventEmitter();
    }
    LineItemComponent.prototype.onDelete = function () {
        this.deleteEvent.emit(this.line._id);
    };
    LineItemComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-line-item',
                    templateUrl: './line-item.component.html',
                    styleUrls: ['./line-item.component.css']
                },] },
    ];
    /** @nocollapse */
    LineItemComponent.ctorParameters = function () { return [
        { type: COLOR_DICTIONARY, },
    ]; };
    LineItemComponent.propDecorators = {
        "deleteEvent": [{ type: Output },],
        "line": [{ type: Input },],
    };
    return LineItemComponent;
}());
export { LineItemComponent };
//# sourceMappingURL=D:/Projects/freeraida/assets/app/rides/list-items/lines/line-item.component.js.map