import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
    selector: 'app-front-sign-in',
    templateUrl: './front-sign-in.component.html',
    styleUrls: ['./front-sign-in.component.css']
})

export class FrontSignInComponent implements OnInit {
    myForm: FormGroup;

    ngOnInit() {
        this.myForm = new FormGroup({
            identification: new FormControl(null, Validators.required),
            password: new FormControl(null, Validators.required)
        });
    }

}