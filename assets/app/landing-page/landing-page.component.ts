import { Component, OnInit } from "@angular/core";
import { Router, Route } from "@angular/router";
import { AuthenticationService } from "../@core/services/authentication.service";
import { FLAG_DICTIONARY } from "../dictionary/flag-dictionary";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { LoginRequest } from "../@core/interfaces/authentication/LoginRequest";

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
    public loginForm = new FormGroup({
        user_input: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required)
    });

    constructor(private fb: FormBuilder,
                private router: Router,
                private authService: AuthenticationService) {}

    ngOnInit(): void {
        this.countryList = FLAG_DICTIONARY.toList();
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

    onGoogle() {
    }

}