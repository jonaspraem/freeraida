import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthenticationService } from "../../../@core/services/authentication.service";

@Component({
    selector: 'app-login-prompt',
    templateUrl: './login-prompt.component.html',
    styleUrls: ['./login-prompt.component.css']
})

export class LoginPromptComponent implements OnInit {
    public form: FormGroup;
    public submitText = 'LOGIN';

    constructor(
        private authService: AuthenticationService,
    ) {}

    ngOnInit() {
        this.form = new FormGroup({
            username_email: new FormControl(null, Validators.required),
            password: new FormControl(null, Validators.required),
        });
    }

    onSubmit() {
        console.log('logging in..');
        const request = {
            username: this.form.controls['username_email'].value,
            password: this.form.controls['password'].value
        };
        this.authService.login(request).subscribe(data => {
            console.log(data);
        });
    }   

    reColor() {
        this.form.markAsUntouched();
    }

}