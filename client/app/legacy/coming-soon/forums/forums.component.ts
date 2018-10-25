import { Component } from "@angular/core";

const image = require('../../../../images/backgrounds/forum_background.png');

@Component({
    selector: 'app-forums',
    templateUrl: './forums.component.html',
    styleUrls: ['./forums.component.css']
})

export class ForumsComponent {
    public background = image;
}