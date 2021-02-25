import { Pipe, PipeTransform } from '@angular/core';
import { Product } from './model/product.model';

@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {

  transform(value: any[], filterString: string, propName: string): any[] {
    const resultArray = [];
    if(value.length === 0 || filterString === '' || propName === '' ){
      return value;
    }
    for(const item of value){
      if(item[propName] === filterString){
        resultArray.push(item)
      }
    }
    return resultArray;
    
  }
 

}
