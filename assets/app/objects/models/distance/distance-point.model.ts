import { DistancePointObject } from "../../interfaces/distance-point-object.interface";

export class DistancePoint {
    distance: number;

    constructor(distance: number) {
        this.distance = distance;
    }

    public static fabricateList(objects: DistancePointObject[]) {
        let points = [];
        for (let i = 0; i < objects.length; i++) {
            points.push(new DistancePoint(objects[i].distance));
        }
        return points;
    }

    public static getScalingDistances(point: DistancePoint[]): number[] {
        let object: number[] = [];
        let total = 0;
        for (let i = 0; i < point.length; i++) {
            total += point[i].distance;
            object.push(total);
        }
        return object;
    }
}