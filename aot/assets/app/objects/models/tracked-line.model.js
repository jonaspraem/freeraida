import { LineLocation } from "./line-location.model";
var TrackedLine = /** @class */ (function () {
    function TrackedLine(_id, locations) {
        this._id = _id;
        this.locations = locations;
    }
    TrackedLine.fabricate = function (object) {
        var locations = [];
        for (var i = 0; i < object.locations.length; i++) {
            locations.push(new LineLocation(object.locations[i].time_at, object.locations[i].lat, object.locations[i].lng));
        }
        return new TrackedLine(object._id, locations);
    };
    TrackedLine.fabricateList = function (objects) {
        var lines = [];
        for (var i = 0; i < objects.length; i++) {
            lines.push(this.fabricate(objects[i]));
        }
        return lines;
    };
    return TrackedLine;
}());
export { TrackedLine };
//# sourceMappingURL=D:/Projects/freeraida/assets/app/objects/models/tracked-line.model.js.map