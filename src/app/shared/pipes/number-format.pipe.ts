import { Pipe, PipeTransform } from '@angular/core';

/**
 * Formats a number as a currency string with two decimal places and a euro symbol.
 * * @example
 * The price is {{ product.price | numberFormat }}
 * @see [Angular Pipes](https://angular.io/guide/pipes)
 * @see [toLocaleString()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString)
 */
@Pipe({
    name: 'numberFormat'
})
export class NumberFormatPipe implements PipeTransform {
    /**
     * Transforms the input value into a formatted currency string.
     *
     * @param value The number to format, or null.
     * @returns The formatted currency string, or an empty string if the input is invalid.
     */
    transform(value: number | null): string {
        if (isNaN(value!!) || value === null) {
            return '';
        }
        const roundedValue = Math.round(value!! * 100) / 100;
        const formattedValue = roundedValue.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        return `${formattedValue} €`;
    }
}