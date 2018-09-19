import {AbstractControl} from '@angular/forms';
export class PasswordValidator {
    static MatchPassword(AC: AbstractControl) {
        let password = AC.get('password').value;
        let confirmPassword = AC.get('password_repeat').value;
        if(password != confirmPassword) {
            AC.get('password_repeat').setErrors( {MatchPassword: true} )
        } else {
            return null
        }
    }
}