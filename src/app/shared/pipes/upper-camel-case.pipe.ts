import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'upperCamelCase'
})
export class UpperCamelCasePipe implements PipeTransform {
    transform(value: string | undefined): unknown {
        if (!value) return value;
        return value.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
    }
}
