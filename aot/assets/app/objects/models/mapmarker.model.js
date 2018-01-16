var MapMarker = /** @class */ (function () {
    function MapMarker(name, lat, lng) {
        this.name = name;
        this.lat = lat;
        this.lng = lng;
    }
    MapMarker.fabricatePolyline = function (markers) {
        var polyline = '';
        for (var _i = 0, markers_1 = markers; _i < markers_1.length; _i++) {
            var m = markers_1[_i];
            polyline += m.lat + ',' + m.lng + '|';
        }
        return polyline.substring(0, polyline.length - 2);
    };
    return MapMarker;
}());
export { MapMarker };
//# sourceMappingURL=D:/Projects/freeraida/assets/app/objects/models/mapmarker.model.js.map