import { Component, OnInit } from "@angular/core";
import { Form, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { RegisterModel } from "./register.model";

@Component({
    selector: 'app-register-prompt',
    templateUrl: './register-prompt.component.html',
    styleUrls: ['./../auth-prompt.component.css']
})

export class RegisterPromptComponent implements OnInit {
    public form: FormGroup;
    public submitText = 'ENLIST NOW';

    constructor() {}

    ngOnInit() {
        this.form = new FormGroup({
            username_email: new FormControl(null, Validators.required),
            password: new FormControl(null, Validators.required),
        });
    }

    onSubmit() {

    }

    reColor() {
        this.form.markAsUntouched();
    }
}