import { Pipe, PipeTransform } from '@angular/core';

/**
 * Tubería (pipe) personalizada para convertir una cadena de texto en formato Upper Camel Case.
 * @pipe
 * @name upperCamelCase
 * @usageNotes
 * Para usar esta tubería, puedes aplicarla a una cadena de texto en tu plantilla Angular de la siguiente manera:
 * ```html
 * <span>{{ someStringValue | upperCamelCase }}</span>
 * ```
 * Esto convertirá la cadena de texto en formato Upper Camel Case, donde la primera letra de cada palabra
 * está en mayúscula y las demás letras en minúscula.
 */
@Pipe({
    name: 'upperCamelCase'
})
export class UpperCamelCasePipe implements PipeTransform {

    /**
     * Transforma una cadena de texto en formato Upper Camel Case.
     * @method transform
     * @param {string | undefined} value - Cadena de texto a ser convertida.
     * @returns {string | undefined} - Cadena de texto en formato Upper Camel Case.
     */
    transform(value: string | undefined): unknown {
        if (!value) return value;
        return value.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
    }
}
