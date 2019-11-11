import { IProblem } from "./problem";

enum BoulderType {
    SLAB,
    ROOF,
    OVERHANG,
    CRACK,
    DYNAMIC
}

export interface IBoulderProblem extends IProblem  {
    tags?: BoulderType[],
}
