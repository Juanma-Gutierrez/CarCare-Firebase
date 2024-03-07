import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * Component representing a password strength indicator.
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
     * Writes the value to the component.
     * @param {any} value - The value to be written.
     * @returns {void}
     */
    writeValue(value: any): void {
        this.password = value;
    }

    /**
     * Registers a callback function to be called when the value changes.
     * @param {any} fn - The callback function.
     * @returns {void}
     */
    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    /**
     * Registers a callback function to be called when the component is touched.
     * @param {any} fn - The callback function.
     * @returns {void}
     */
    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    /**
     * Handles the input change event.
     * Updates the password strength indicators.
     * @returns {void}
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
     * Updates the visibility of password strength indicators.
     * @returns {void}
     */
    private updateIndicators(): void {
        this.passwordIndicators.forEach((indicator) => {
            indicator.visible = this.checkIndicator(indicator.key);
        });
    }

    /**
     * Checks if the password meets the indicator criteria.
     * @param {string} key - The key of the indicator.
     * @returns {boolean} - Indicates if the password meets the indicator criteria.
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