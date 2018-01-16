var Line = /** @class */ (function () {
    function Line(lineName, line_type, timestamp, markers, danger_level, tree_level, rock_level, cliff_level) {
        this.lineName = lineName;
        this.line_type = line_type;
        this.timestamp = timestamp;
        this.markers = markers;
        this.danger_level = danger_level;
        this.tree_level = tree_level;
        this.rock_level = rock_level;
        this.cliff_level = cliff_level;
    }
    Line.fabricate = function (object) {
        return new Line(object.lineName, object.line_type, new Date(object.timestamp), object.markers, object.danger_level, object.tree_level, object.rock_level, object.cliff_level);
    };
    Line.fabricateList = function (objects) {
        var lines = [];
        for (var i = 0; i < objects.length; i++) {
            lines.push(this.fabricate(objects[i]));
        }
        return lines;
    };
    return Line;
}());
export { Line };
//# sourceMappingURL=D:/Projects/freeraida/assets/app/objects/models/line.model.js.map