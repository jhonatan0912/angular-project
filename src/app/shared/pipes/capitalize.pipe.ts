/* import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalize',
  standalone: true,
})
export class CapitalizePipe implements PipeTransform {
  transform(value: string): string {
    if (!value) {
      return '';
    }
    // Capitaliza la primera letra del texto y convierte el resto a minúsculas
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  }
}
 */

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalize',
  standalone: true,
})
export class CapitalizePipe implements PipeTransform {
  transform(value: string): string {
    if (!value) {
      return '';
    }

    // Divide la cadena en palabras usando espacios
    const words = value.split(' ');

    // Capitaliza cada palabra y conviértela en un array de palabras capitalizadas
    const capitalizedWords = words.map(word => {
      // Capitaliza la primera letra de cada palabra
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    });

    // Une las palabras capitalizadas en una sola cadena y retorna el resultado
    return capitalizedWords.join(' ');
  }
}
