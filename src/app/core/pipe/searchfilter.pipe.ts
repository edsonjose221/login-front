import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchfilter'
})
export class SearchfilterPipe implements PipeTransform {

  transform(users: any[], searchText: string, type: string): any[] {
    if (!users) {
      return [];
    }

    if (!searchText) {  
      return users;
    }

    searchText = searchText.toLowerCase();

    return users.filter(people => people[type].toLowerCase().includes(searchText));
  }

}
