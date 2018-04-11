import { Component, OnInit } from "@angular/core";
import { Form, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { RegisterModel } from "./register.model";

@Component({
    selector: 'app-register-prompt',
    templateUrl: './register-prompt.component.html',
    styleUrls: ['./../auth-prompt.component.css']
})

export class RegisterPromptComponent implements OnInit {
    public registration_form: FormGroup;
    public form: RegisterModel = new RegisterModel('', '', '', '', '');

    constructor(private fb:FormBuilder) {}

    ngOnInit() {
        this.registration_form = new FormGroup({
            username: new FormControl(this.form.username, Validators.required),
            email: new FormControl(this.form.email, Validators.required),
            password: new FormControl(this.form.password, Validators.required),
            password_confirmation: new FormControl(this.form.password_confirmation, Validators.required)
        });
    }

    onSubmit(form: Form) {

    }
}