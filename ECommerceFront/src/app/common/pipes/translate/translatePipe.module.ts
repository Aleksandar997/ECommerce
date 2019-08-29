import { NgModule } from '@angular/core';
import { TranslatePipe } from './translatePipe';

@NgModule({
  exports: [TranslatePipe],
  declarations: [TranslatePipe]
})
export class TranslatePipeModule { }
