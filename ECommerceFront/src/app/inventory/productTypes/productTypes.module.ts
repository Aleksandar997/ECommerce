import { NgModule } from '@angular/core';
import { ProductTypesComponent } from './productTypes.component';
import { ProductTypesRoutingModule } from './productTypes-routing.module';
import { ToasterModule } from 'src/app/common/components/toaster/toaster.module';
import { LoaderModule } from 'src/app/common/components/loader/loader.module';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule } from '@angular/forms';
import { TranslatePipeModule } from 'src/app/common/pipes/translate/translatePipe.module';
import { ModalBaseModule } from 'src/app/common/components/modalBase/modalBase.module';

@NgModule({
  imports: [ProductTypesRoutingModule,
            ToasterModule,
            LoaderModule,
            MaterialModule,
            FormsModule,
            TranslatePipeModule,
            ModalBaseModule],
  declarations: [ProductTypesComponent],
  exports: [ProductTypesComponent]
})
export class ProductTypesModule { }
