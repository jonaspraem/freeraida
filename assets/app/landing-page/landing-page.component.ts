import { Component, OnInit } from "@angular/core";
import { Router, Route } from "@angular/router";
import { AuthenticationService } from "../@core/services/authentication.service";
import { FLAG_DICTIONARY } from "../dictionary/flag-dictionary";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { LoginRequest } from "../@core/interfaces/authentication/LoginRequest";
import { UsernameValidator } from "../@shared/form-validators/UsernameValidator";
import { PasswordValidator } from "../@shared/form-validators/PasswordValidator";
import signup_messages from "./constants/SignupValidationMessages";

const image = require('../../images/350214-mountain-view.jpg');

const logoImage = require('../../images/logo/favicon.png');
const backgroundImage = require('../../images/backgrounds/snow-3193865_1920.jpg');

@Component({
    selector: 'app-landing-page',
    templateUrl: './landing-page.component.html',
    // styleUrls: ['../@styles/features/landing-page.scss']
})

export class LandingPageComponent implements OnInit {
    public logo = logoImage;
    public background = backgroundImage;
    public countryList;
    public messages;
    public loginForm = new FormGroup({
        user_input: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required)
    });
    public signUpForm = new FormGroup({
        email: new FormControl('johndoe@mail.com', Validators.compose([
            Validators.required,
            Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
        ])),
        username: new FormControl('', Validators.compose([
            UsernameValidator.validUsername,
            Validators.required,
            Validators.maxLength(25),
            Validators.minLength(5)
        ])),
        firstName: new FormControl('', Validators.required),
        surName: new FormControl('', Validators.required),
        password: new FormControl('', Validators.compose([
            Validators.minLength(5),
            Validators.required,
            Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$') //this is for the letters (both uppercase and lowercase) and numbers validation
        ])),
        password_repeat: new FormControl('', Validators.required),
        country: new FormControl('', Validators.required)
    }, (formGroup: FormGroup) => {
        return PasswordValidator.areEqual(formGroup);
    });

    constructor(private fb: FormBuilder,
                private router: Router,
                private authService: AuthenticationService) {}

    ngOnInit(): void {
        this.countryList = FLAG_DICTIONARY.toList();
        this.messages = signup_messages;
    }

    reColor() {
        this.loginForm.markAsUntouched();
    }

    onLogin() {
        console.log('logging in..');
        let request: LoginRequest;
        if (this.loginForm.controls.user_input.value.includes('@')) {
            request = {
                email: this.loginForm.controls.user_input.value,
                password: this.loginForm.controls.password.value
            };
        } else {
            request = {
                username: this.loginForm.controls.user_input.value,
                password: this.loginForm.controls.password.value
            };
        }
        this.authService.login(request).subscribe(data => console.log(data));
    }

    onSignUp() {

    }

    onGoogle() {
    }

}