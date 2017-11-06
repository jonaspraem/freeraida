import { AbstractControl } from "@angular/forms";

export class equalValidation {
    static matchPassword(AC: AbstractControl){
        let password=AC.get('password').value;
        let repeatPassword=AC.get('repeat-password').value;
        if(password!=repeatPassword){
            console.log(false);
        }
    }
}