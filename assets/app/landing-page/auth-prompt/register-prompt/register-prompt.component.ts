import { Component, OnInit } from "@angular/core";
import { Form, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { RegisterModel } from "../../register.model";
import { AuthenticationService } from "../../../@core/services/authentication.service";
import { EnlistRequest } from "../../../@core/interfaces/auth";

@Component({
    selector: 'app-register-prompt',
    templateUrl: './register-prompt.component.html',
    styleUrls: ['./register-prompt.component.css']
})

export class RegisterPromptComponent implements OnInit {
    public form: FormGroup;
    public submitText = 'SIGN UP';
    public cancelText = 'CLEAR';

    constructor(private authService: AuthenticationService) {}

    ngOnInit() {
        this.form = new FormGroup({
            username_email: new FormControl(null, Validators.required),
            username: new FormControl(null, Validators.required),
            password: new FormControl(null, Validators.required),
            password_repeat: new FormControl(null, Validators.required)
        });
    }

    onSubmit() {
        const request: EnlistRequest = {
            email: this.form.controls['username_email'].value,
            username: this.form.controls['username'].value,
            password: this.form.controls['password'].value,
            password_confirmation: this.form.controls['password_repeat'].value
        };
        this.authService.enlist(request).subscribe(data => {
            console.log('enlisted');
        });
    }

    onCancel() {
        console.log('clear');
    }

    reColor() {
        this.form.markAsUntouched();
    }
}