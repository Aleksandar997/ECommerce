import { NgModule } from '@angular/core';
import { CustomersRoutingModule } from './customers-routing.module';
import { MaterialModule } from '../material.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoaderModule } from '../common/components/loader/loader.module';
import { ToasterModule } from '../common/components/toaster/toaster.module';
import { MatPaginatorModule } from '@angular/material';
import { ModalBaseModule } from '../common/components/modalBase/modalBase.module';
import { TranslatePipeModule } from '../common/pipes/translate/translatePipe.module';
import { CustomersComponent } from './customers.component';


@NgModule({
  imports: [CustomersRoutingModule, MaterialModule,
    CommonModule, FormsModule, LoaderModule, ToasterModule, MatPaginatorModule, ModalBaseModule, TranslatePipeModule],
  declarations: [CustomersComponent],
  providers: [],
})
export class CustomersModule { }
