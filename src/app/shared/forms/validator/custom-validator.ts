import {AbstractControl, FormGroup, ValidationErrors, ValidatorFn} from '@angular/forms';

export function DateLessThan(from: string, to: string): ValidatorFn {

    return (group: FormGroup): ValidationErrors | null  => {
        const f = group.controls[from];
        const t = group.controls[to];
        if (t.value !== null) {
            if (f.value > t.value) {
                return {
                    dates: 'Date to should be greater than Date from'
                };
            }
        }
        return {};
    };
}


export function MustMatch(controlName: string, matchingControlName: string): ValidatorFn {
    return (formGroup: FormGroup): ValidationErrors | null => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({mustMatch: true});
        } else {
            matchingControl.setErrors(null);
        }
    };
}


