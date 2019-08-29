import { NgModule } from '@angular/core';
import { CodebookComponent } from './codebook.component';
import { MaterialModule } from 'src/app/material.module';
import { TranslatePipeModule } from '../../pipes/translate/translatePipe.module';

@NgModule({
  imports: [MaterialModule, TranslatePipeModule],
  declarations: [CodebookComponent],
  exports: [CodebookComponent]
})
export class CodebookModule { }
