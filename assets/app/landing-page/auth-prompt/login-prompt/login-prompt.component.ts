import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
    selector: 'app-login-prompt',
    templateUrl: './login-prompt.component.html',
    styleUrls: ['./../auth-prompt.component.css']
})

export class LoginPromptComponent implements OnInit {
    public form: FormGroup;

    constructor() {}

    ngOnInit() {
        this.form = new FormGroup({
            username_email: new FormControl(null, Validators.required),
            password: new FormControl(null, Validators.required),
        });
    }

}