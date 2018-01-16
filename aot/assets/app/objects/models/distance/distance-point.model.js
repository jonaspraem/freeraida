var DistancePoint = /** @class */ (function () {
    function DistancePoint(distance) {
        this.distance = distance;
    }
    DistancePoint.fabricateList = function (objects) {
        var points = [];
        for (var i = 0; i < objects.length; i++) {
            points.push(new DistancePoint(objects[i].distance));
        }
        return points;
    };
    DistancePoint.getScalingDistances = function (point) {
        var object = [];
        var total = 0;
        for (var i = 0; i < point.length; i++) {
            total += point[i].distance;
            object.push(total);
        }
        return object;
    };
    return DistancePoint;
}());
export { DistancePoint };
//# sourceMappingURL=D:/Projects/freeraida/assets/app/objects/models/distance/distance-point.model.js.map