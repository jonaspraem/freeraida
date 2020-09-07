import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../core/services/authentication.service';
import { FLAG_DICTIONARY } from '../../dictionary/flag-dictionary';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ILogin } from '../../models/interfaces/requests/authentication/login.interface';
import { UsernameValidator } from '../../shared/form-validators/UsernameValidator';
import { PasswordValidator } from '../../shared/form-validators/PasswordValidator';
import signup_messages from './SignupValidationMessages';
import { IRegister } from '../../models/interfaces/requests/authentication/register.interface';

const image = require('../../../images/350214-mountain-view.jpg');

const logoImage = require('../../../images/logo/favicon.png');
const backgroundImage = require('../../../images/350214-mountain-view.jpg');

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing.page.component.html',
})
export class LandingPageComponent implements OnInit {
  public logo = logoImage;
  public background = backgroundImage;
  public countryList;
  public messages;
  public isLogin: boolean = true;
  public loginForm = new FormGroup({
    userInput: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  public signupForm = new FormGroup(
    {
      email: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])
      ),
      username: new FormControl(
        '',
        Validators.compose([
          UsernameValidator.validUsername,
          Validators.required,
          Validators.maxLength(25),
          Validators.minLength(2),
        ])
      ),
      firstname: new FormControl('', Validators.required),
      surname: new FormControl('', Validators.required),
      password: new FormControl(
        '',
        Validators.compose([
          Validators.minLength(5),
          Validators.required,
          // Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$') //this is for the letters (both uppercase and lowercase) and numbers validation
        ])
      ),
      password_confirmation: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
    },
    (formGroup: FormGroup) => {
      return PasswordValidator.MatchPassword(formGroup);
    }
  );

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthenticationService) {}

  ngOnInit(): void {
    this.authService.logout(); // Force logout
    this.countryList = FLAG_DICTIONARY.toList();
    this.messages = signup_messages;
  }

  reColor() {
    this.loginForm.markAsUntouched();
  }

  onLogin() {
    console.log('logging in..');
    let request: ILogin;
    if (this.loginForm.controls.userInput.value.includes('@')) {
      request = {
        email: this.loginForm.controls.userInput.value,
        password: this.loginForm.controls.password.value,
      };
    } else {
      request = {
        username: this.loginForm.controls.userInput.value,
        password: this.loginForm.controls.password.value,
      };
    }
    this.authService.login(request);
  }

  onSignup() {
    console.log('signing up..');
    let request: IRegister = {
      email: this.signupForm.controls.email.value,
      username: this.signupForm.controls.username.value,
      firstname: this.signupForm.controls.firstname.value,
      surname: this.signupForm.controls.surname.value,
      password: this.signupForm.controls.password.value,
      password_confirmation: this.signupForm.controls.password_confirmation.value,
      country: this.signupForm.controls.country.value,
    };
    this.authService.register(request);
  }

  onToggle() {
    this.isLogin = !this.isLogin;
  }

  onGoogle() {}
}
