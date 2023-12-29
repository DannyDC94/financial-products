import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'formatDate'
})
export class FormatDatePipe implements PipeTransform {
  transform(value: any, format: string = 'dd/MM/yyyy'): any {
    if (value) {
      // Parsea la cadena de fecha a un objeto Date
      const date = new Date(value);

      // Ajusta manualmente el día para obtener el formato correcto
      const day = date.getUTCDate().toString().padStart(2, '0');

      // Obtiene el mes y ajusta para obtener el formato correcto
      const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');

      // Obtiene el año y ajusta para obtener el formato correcto
      const year = date.getUTCFullYear();

      // Combina las partes para obtener el resultado final
      const formattedDate = `${day}/${month}/${year}`;

      return formattedDate;
    }
    return value;
  }
}
