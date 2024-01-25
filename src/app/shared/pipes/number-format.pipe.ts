import { Pipe, PipeTransform } from '@angular/core';

/**
 * Tubería (pipe) personalizada para formatear números con dos decimales y añadir la unidad de moneda (€).
 * @pipe
 * @name numberFormat
 * @usageNotes
 * Para usar esta tubería, puedes aplicarla a un valor numérico en tu plantilla Angular de la siguiente manera:
 * ```html
 * <span>{{ someNumberValue | numberFormat }}</span>
 * ```
 * Esto formateará el número con dos decimales y añadirá la unidad de moneda (€) al final.
 */
@Pipe({
    name: 'numberFormat'
})
export class NumberFormatPipe implements PipeTransform {

    /**
     * Transforma un número en una cadena de texto formateada con dos decimales y la unidad de moneda (€).
     * @method transform
     * @param {number | null} value - Número a ser formateado.
     * @returns {string} - Cadena de texto formateada con dos decimales y la unidad de moneda (€).
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