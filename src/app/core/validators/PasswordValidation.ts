import { AbstractControl, FormControl, ValidationErrors, ValidatorFn } from "@angular/forms";
export class PasswordValidation {

    /**
     * Validates the password format according to certain criteria.
     * @param {string} controlName - The name of the form control.
     * @returns {ValidatorFn} - The validator function.
     */
    public static passwordProto(controlName: string = ''): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            let password = '';
            if (control instanceof FormControl)
                password = control?.value;
            else
                password = control.get(controlName)?.value;
            // Requires at least one uppercase letter, one lowercase letter, number and 8 characters
            if (password && !password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)) {
                return { 'passwordProto': true };
            }
            else {
                return null;
            }
        }
    }

    /**
     * Validates if the password and confirm password fields match.
     * @param {string} passwordControlName - The name of the password form control.
     * @param {string} confirmControlName - The name of the confirm password form control.
     * @returns {ValidatorFn} - The validator function.
     */
    public static passwordMatch(passwordControlName: string, confirmControlName: string): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const password = control.get(passwordControlName)?.value;
            const confirmPassword = control.get(confirmControlName)?.value;
            if (password != confirmPassword) {
                let errors = control?.errors;
                if (errors && typeof errors === 'object') {
                    Object.assign(errors, {
                        'passwordMatch': true
                    });
                } else {
                    errors = {
                        'passwordMatch': true
                    };
                }
                return errors;
            }
            else {
                let errors = control?.errors;
                if (errors && typeof errors === 'object') {
                    if (errors['passwordMatch'])
                        delete errors['passwordMatch'];
                }
                return control.errors;
            }
        }
    }
}