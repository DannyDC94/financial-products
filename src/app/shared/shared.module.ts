import { NgModule } from '@angular/core';
import { FormatDatePipe } from '../pipes/date-format.pipe'

@NgModule({
  declarations: [FormatDatePipe],
  exports: [
    FormatDatePipe
  ],
  imports: []
})
export class SharedModule { }
