import { Pipe, PipeTransform } from '@angular/core';

/**
 * Custom pipe to capitalize the first letter of a string and convert the rest to lowercase.
 * Usage:
 * {{ 'hello world' | capitalize }} // Output: 'Hello world'
 * @param value The input string to be capitalized.
 * @returns The capitalized string.
 */
@Pipe({
    name: 'capitalize'
})
export class CapitalizePipe implements PipeTransform {

    /**
     * Transforms a string by converting the first character to uppercase and all subsequent characters to lowercase.
     * @param value The string to be transformed (can be undefined).
     * @returns The transformed string with the first character uppercase and the rest lowercase, or undefined if the input was undefined.
     */
    transform(value: string | undefined): unknown {
        if (!value) return value;
        return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    }
}

