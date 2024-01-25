import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * Componente para evaluar la fortaleza de una contraseña y mostrar indicadores visuales.
 */
@Component({
    selector: 'app-password-strength',
    templateUrl: './password-strength.component.html',
    styleUrls: ["./password-strength.component.css"],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => PasswordStrengthComponent),
            multi: true,
        },
    ],
})
export class PasswordStrengthComponent implements ControlValueAccessor {
    passwordControl = new FormControl();
    password: string = '';
    passwordIndicators = [
        { text: 'A', key: 'uppercase', visible: false },
        { text: 'a', key: 'lowercase', visible: false },
        { text: 'Num.', key: 'number', visible: false },
        { text: '8', key: 'length', visible: false },
    ];
    onChange: any = () => { };
    onTouched: any = () => { };


    /**
     * Función llamada cuando cambia el valor del componente.
     * @param value - Nuevo valor de la contraseña.
     */
    writeValue(value: any): void {
        this.password = value;
    }

    /**
     * Registra una función de devolución de llamada para ser llamada cuando cambia el valor del componente.
     * @param fn - Función de devolución de llamada.
     */
    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    /**
     * Registra una función de devolución de llamada para ser llamada cuando se toca el componente.
     * @param fn - Función de devolución de llamada.
     */
    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    /**
     * Maneja el evento de cambio en la entrada de contraseña.
     * Actualiza los indicadores y la longitud de la contraseña.
     */
    onInputChange(): void {
        this.updateIndicators();
        this.onChange(this.password);
        this.onTouched();
        const lengthIndicator = this.passwordIndicators.find(indicator => indicator.key === 'length');
        if (lengthIndicator) {
            if (this.password.length <= 8) {
                lengthIndicator.text = (8 - this.password.length).toString();
            }
            else {
                lengthIndicator.text = "0";
            }
        }
    }

    /**
     * Actualiza los indicadores de la contraseña basándose en las características actuales.
     */
    private updateIndicators(): void {
        this.passwordIndicators.forEach((indicator) => {
            indicator.visible = this.checkIndicator(indicator.key);
        });
    }

    /**
     * Verifica si se cumple una característica específica de la contraseña.
     * @param key - Clave de la característica a verificar.
     * @returns Verdadero si la característica está presente, falso de lo contrario.
     */
    private checkIndicator(key: string): boolean {
        switch (key) {
            case 'uppercase':
                return /[A-Z]/.test(this.password);
            case 'lowercase':
                return /[a-z]/.test(this.password);
            case 'number':
                return /\d/.test(this.password);
            case 'length':
                return this.password.length >= 8;
            default:
                return false;
        }
    }
}