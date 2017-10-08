import { Component, Input } from "@angular/core";
import { Profile } from "./profile.model";

@Component({
    selector: 'app-profile-bio',
    templateUrl: './bio.component.html',
    styleUrls: ['./bio.component.css']
})

export class BioComponent {
    @Input() profile: Profile;

}