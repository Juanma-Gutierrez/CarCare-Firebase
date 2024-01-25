import { AbstractControl, FormControl, ValidationErrors, ValidatorFn } from "@angular/forms";
export class PasswordValidation {

    /**
     * Validador para verificar que la contraseña cumple con los requisitos mínimos.
     * @param controlName Nombre del control de formulario que contiene la contraseña.
     * @return Función de validación.
     */
    public static passwordProto(controlName: string = ''): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            let password = '';
            if (control instanceof FormControl)
                password = control?.value;
            else
                password = control.get(controlName)?.value;
            // Requiere al menos una mayúscula, una minúscula, número y 8 caracteres
            if (password && !password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)) {
                return { 'passwordProto': true };
            }
            else {
                return null;
            }
        }
    }

    /**
     * Validador para verificar que las contraseñas coinciden.
     * @param passwordControlName Nombre del control de formulario que contiene la contraseña.
     * @param confirmControlName Nombre del control de formulario que contiene la confirmación de la contraseña.
     * @return Función de validación.
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