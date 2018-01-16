import { DistancePoint } from "./distance-point.model";
var LineDistance = /** @class */ (function () {
    function LineDistance(distances) {
        this.distances = distances;
    }
    LineDistance.fabricate = function (object) {
        return new LineDistance(DistancePoint.fabricateList(object.distances));
    };
    LineDistance.prototype.getScalingDistances = function () {
        var object = [];
        var total = 0;
        for (var i = 0; i < this.distances.length; i++) {
            total += this.distances[i].distance;
            object.push(total);
        }
        return object;
    };
    return LineDistance;
}());
export { LineDistance };
//# sourceMappingURL=D:/Projects/freeraida/assets/app/objects/models/distance/line-distance.model.js.map