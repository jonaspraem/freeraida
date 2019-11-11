import { ICoordinate } from "../types/coordinate";

export interface IProblem extends ICoordinate {
    id: string;
    rawGrade: number;
}

