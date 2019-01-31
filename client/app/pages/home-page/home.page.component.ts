import { Component, OnInit } from "@angular/core";
import { IPost, IUserProfile } from "../../models/interfaces/types";
import { ProfileService } from "../../core/services/profile.service";

@Component({
    selector: 'app-home-page',
    templateUrl: './home.page.component.html'
})

export class HomePageComponent implements OnInit {
    public userProfile: IUserProfile;
    public postList: IPost[] = [
        {
            content: "Lorem ipsum",
            username: "joedijazz",
            firstname: "Joey",
            surname: "Diaz",
            fullname: "Joey Diaz",
            timestamp: new Date(),
        },
        {
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus pulvinar quam in ex cursus, quis pretium est lobortis. Donec vestibulum augue ex, sit amet mollis libero aliquam gravida. Cras malesuada, sem in luctus dignissim, dolor magna posuere sapien, a molestie lorem orci in ex. Fusce laoreet laoreet turpis, condimentum pellentesque velit mattis eget.",
            username: "joedijazz",
            firstname: "Joey",
            surname: "Diaz",
            fullname: "Joey Diaz",
            timestamp: new Date(),
        },
        {
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus pulvinar quam in ex cursus, quis pretium est lobortis. Donec vestibulum augue ex, sit amet mollis libero aliquam gravida. Cras malesuada, sem in luctus dignissim, dolor magna posuere sapien, a molestie lorem orci in ex. Fusce laoreet laoreet turpis, condimentum pellentesque velit mattis eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus pulvinar quam in ex cursus, quis pretium est lobortis. Donec vestibulum augue ex, sit amet mollis libero aliquam gravida. Cras malesuada, sem in luctus dignissim, dolor magna posuere sapien, a molestie lorem orci in ex. Fusce laoreet laoreet turpis, condimentum pellentesque velit mattis eget.",
            username: "joedijazz",
            firstname: "Joey",
            surname: "Diaz",
            fullname: "Joey Diaz",
            timestamp: new Date(),
        }
    ];

    constructor(
        private _profileService: ProfileService
    ) {}

    public ngOnInit(): void {
        this._profileService.userProfile$.subscribe(profile => {
            this.userProfile = profile;
        });
    }

}