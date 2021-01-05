import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  // pure: false // this will force the pipe to get recalculated whenever data changes. It will cost performance
              // issue. Angular by default does not allow us this (Pure pipe). Means when we have entered a
              // filter to filter our servers, and add a server, although server will get added but we won't see
              // them added as filter in entered. The moment we remove the filters we will see the added servers.
              // Means changing the input of the pipe (filtered string) will trigger a recalculation.
              // But setting this property to false we will be able to see the added servers even when the
              // filter is entered. Hence, the pipe gets calculated whenever data changes
})
export class FilterPipe implements PipeTransform {

  transform(value: any, filterString: string, propName: string): any {
    if(value.length === 0 || filterString === ''){
      return value;
    }
    const resultArray = [];
    for(const item of value){
      if(item[propName] === filterString){
        console.log(item[propName]);
        resultArray.push(item);
      }
    }
    return resultArray;
  }

}
