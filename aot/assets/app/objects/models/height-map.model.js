import { Location } from "./location.model";
var HeightMap = /** @class */ (function () {
    function HeightMap(elevation, location, resolution) {
        this.elevation = elevation;
        this.location = location;
        this.resolution = resolution;
    }
    HeightMap.fabricate = function (object) {
        return new HeightMap(object.elevation, new Location(object.location.lat, object.location.lng), object.resolution);
    };
    HeightMap.fabricateList = function (objects) {
        var list = [];
        for (var i = 0; i < objects.length; i++) {
            list.push(HeightMap.fabricate(objects[i]));
        }
        return list;
    };
    return HeightMap;
}());
export { HeightMap };
//# sourceMappingURL=D:/Projects/freeraida/assets/app/objects/models/height-map.model.js.map