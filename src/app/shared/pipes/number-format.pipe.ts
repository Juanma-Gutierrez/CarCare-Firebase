import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'numberFormat'
})
export class NumberFormatPipe implements PipeTransform {
    transform(value: number | null): string {
        if (isNaN(value!!) || value === null) {
            return '';
        }
        const roundedValue = Math.round(value!! * 100) / 100;
        const formattedValue = roundedValue.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        return `${formattedValue} €`;
    }
}