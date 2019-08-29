import { NgModule } from '@angular/core';
import { DocumentComponent } from './document.component';
import { DocumentRoutingModule } from './document-routing.module';
import { MaterialModule } from 'src/app/material.module';
import { LoaderModule } from 'src/app/common/components/loader/loader.module';
import { ToasterModule } from 'src/app/common/components/toaster/toaster.module';
import { TranslatePipeModule } from 'src/app/common/pipes/translate/translatePipe.module';
import { FormsModule } from '@angular/forms';
import { ActionComponent } from './action/action.component';
import { CommonModule } from '@angular/common';
import { ModalBaseModule } from 'src/app/common/components/modalBase/modalBase.module';

@NgModule({
  declarations: [DocumentComponent, ActionComponent],
  imports: [
    DocumentRoutingModule,
    MaterialModule,
    LoaderModule,
    ToasterModule,
    TranslatePipeModule,
    FormsModule,
    CommonModule,
    ModalBaseModule
  ],
  entryComponents: [ActionComponent]
})
export class DocumentModule { }
