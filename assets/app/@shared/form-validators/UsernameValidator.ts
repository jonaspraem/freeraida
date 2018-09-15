import { FormControl } from '@angular/forms';
export class UsernameValidator {
    static validUsername(fc: FormControl){
        if(fc.value.toLowerCase().includes('@')) {
            return ({validUsername: true});
        } else {
            return (null);
        }
    }
}
