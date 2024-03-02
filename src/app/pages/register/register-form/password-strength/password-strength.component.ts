import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';

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

    writeValue(value: any): void {
        this.password = value;
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

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

    private updateIndicators(): void {
        this.passwordIndicators.forEach((indicator) => {
            indicator.visible = this.checkIndicator(indicator.key);
        });
    }

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