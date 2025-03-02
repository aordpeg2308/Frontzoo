import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cursiva'
})
export class CursivaePipe implements PipeTransform {
  transform(value: string): string {
    return `<em>${value}</em>`;
  }
}
