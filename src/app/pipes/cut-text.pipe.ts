import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cutText'
})
export class CutTextPipe implements PipeTransform {
  transform(text:string,num:number=15): string {
    return text.split(' ',num).join(' ');
  }
}
