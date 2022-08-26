import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'passwordfilter'
})
export class PasswordfilterPipe implements PipeTransform {

  transform(value: string): any {
      if (value) {
        return "********"
      }
  }

}
