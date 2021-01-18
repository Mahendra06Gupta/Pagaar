import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberRound'
})
export class NumberRoundPipe implements PipeTransform {

  transform(value: number, upward: boolean): number {
    console.log(upward, value);
    if (upward) {
      return Math.ceil(value);
    } else {
      return Math.floor(value);
    }
  }

}
