import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: "truncateStringPipe"
})
export class TruncateStringPipe implements PipeTransform {
  transform(text: string, length: number): string {
    if (text == null || text.length <= length) {
      return text;
    }
    else {
       return text.substring(0, length) + "...";
     }
  }
}
