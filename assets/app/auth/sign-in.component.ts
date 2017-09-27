import {Component} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html'
})

export class SignInComponent {
    myForm: FormGroup;

    onSubmit() {
        console.log(this.myForm);
        this.myForm.reset();
    }

    ngOnInit() {
        this.myForm = new FormGroup({
            email: new FormControl(null, [
                Validators.required,
                Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
            ]),
            password: new FormControl(null, Validators.required)
        });
    }
}