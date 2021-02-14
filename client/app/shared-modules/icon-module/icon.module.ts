import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { SkiIcon } from "./ski/ski-icon.component";
import { SnowboardIcon } from "./snowboard/snowboard-icon.component";
import { ClimbingIcon } from "./climbing/climbing-icon.component";
import { IceClimbingIcon } from "./ice-climbing/ice-climbing-icon.component";
import { MountainBikeIcon } from "./mountain-bike/mountain-bike-icon.component";
import { MountaineeringIcon } from "./mountaineering/mountaineering-icon.component";
import { ParachuteIcon } from "./parachute/parachute-icon.component";
import { LikeIcon } from "./like/like.component";

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        SkiIcon,
        SnowboardIcon,
        ClimbingIcon,
        IceClimbingIcon,
        MountainBikeIcon,
        MountaineeringIcon,
        ParachuteIcon,
        LikeIcon
    ],
    exports: [
        SkiIcon,
        SnowboardIcon,
        ClimbingIcon,
        IceClimbingIcon,
        MountainBikeIcon,
        MountaineeringIcon,
        ParachuteIcon,
        LikeIcon
    ]
})

export class IconModule {}