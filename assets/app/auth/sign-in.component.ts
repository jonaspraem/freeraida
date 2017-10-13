import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { User } from "./user.model";
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html'
})

export class SignInComponent implements OnInit {
    myForm: FormGroup;

    constructor(private authService: AuthService, private router: Router) {}

    onSubmit() {
        var identification = this.myForm.value.identification.toString();
        var username = '';
        var email = '';

        // TODO: make better email verifier
        if (identification.includes('@') && identification.includes('.')) {
            email = this.myForm.value.identification;
        } else {
            username = this.myForm.value.identification;
        }
        const user = new User(username, email, this.myForm.value.password, this.myForm.value.firstName, this.myForm.value.lastName);
        this.authService.signIn(user)
            .subscribe(
            data => {
                localStorage.setItem('token', data.token);
                localStorage.setItem('userId', data.userId);
                localStorage.setItem('username', data.username);
                this.router.navigateByUrl('/');
            },
            error => console.error(error)
        );
        this.myForm.reset();
    }

    ngOnInit() {
        this.myForm = new FormGroup({
            identification: new FormControl(null, Validators.required),
            password: new FormControl(null, Validators.required)
        });
    }
}