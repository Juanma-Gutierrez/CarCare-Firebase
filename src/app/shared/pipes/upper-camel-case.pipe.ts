import { Pipe, PipeTransform } from '@angular/core';

/**
 * Transforms a string into Upper Camel Case format.
 * @example
 * ```html
 * This is a sentence. | upperCamelCase
 * ```
 * This would output: "This Is A Sentence"
 */
@Pipe({
    name: 'upperCamelCase'
})
export class UpperCamelCasePipe implements PipeTransform {
    /**
     * Transforms the input string to Upper Camel Case format.
     *
     * @param value The string to be transformed, or undefined.
     * @returns The transformed string in Upper Camel Case format, or the original value if it's undefined.
     */
    transform(value: string | undefined): unknown {
        if (!value) return value;
        return value.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
    }
}
