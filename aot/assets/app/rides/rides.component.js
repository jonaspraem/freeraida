import { Component } from "@angular/core";
import { TrackedLine } from "../objects/models/tracked-line.model";
import { Line } from "../objects/models/line.model";
import { RidesService } from "./rides.service";
var RidesComponent = /** @class */ (function () {
    function RidesComponent(rides_service) {
        this.rides_service = rides_service;
    }
    RidesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.rides_service.getTrackedLines().subscribe(function (data) {
            console.log(JSON.stringify(data));
            _this.unregistered_line_list = TrackedLine.fabricateList(data.obj);
        });
        this.rides_service.getUserLines().subscribe(function (data) {
            console.log(JSON.stringify(data));
            _this.line_list = Line.fabricateList(data.obj);
        });
    };
    RidesComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-rides',
                    templateUrl: './rides.component.html',
                    styleUrls: ['./rides.component.css']
                },] },
    ];
    /** @nocollapse */
    RidesComponent.ctorParameters = function () { return [
        { type: RidesService, },
    ]; };
    return RidesComponent;
}());
export { RidesComponent };
//# sourceMappingURL=D:/Projects/freeraida/assets/app/rides/rides.component.js.map