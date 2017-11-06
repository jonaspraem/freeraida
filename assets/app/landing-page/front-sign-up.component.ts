import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
    selector: 'app-front-sign-up',
    templateUrl: './front-sign-up.component.html',
    styleUrls: ['./front-sign-up.component.css']
})

// TODO: Validate password equals
export class FrontSignUpComponent implements OnInit {
    myForm: FormGroup;

    ngOnInit() {
        this.myForm = new FormGroup({
            username: new FormControl(null, Validators.required),
            firstName: new FormControl(null, Validators.required),
            lastName: new FormControl(null, Validators.required),
            email: new FormControl(null, [
                Validators.required,
                Validators.email
            ]),
            password: new FormControl(null, Validators.required)
        });
    }
}