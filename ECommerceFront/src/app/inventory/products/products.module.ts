import { NgModule } from '@angular/core';
import { ProductsComponent } from './products.component';
import { ProductsRoutingModule } from './products-routing.module';
import { MaterialModule } from 'src/app/material.module';
import { CommonModule } from '@angular/common';
import { ActionComponent } from './action/action.component';
import { FormsModule } from '@angular/forms';
import { LoaderModule } from 'src/app/common/components/loader/loader.module';
import { ToasterModule } from 'src/app/common/components/toaster/toaster.module';
import { MatPaginatorModule } from '@angular/material';
import { ModalBaseModule } from 'src/app/common/components/modalBase/modalBase.module';
import { TranslatePipeModule } from 'src/app/common/pipes/translate/translatePipe.module';

@NgModule({
  imports: [ProductsRoutingModule, MaterialModule,
    CommonModule, FormsModule, LoaderModule, ToasterModule, MatPaginatorModule, ModalBaseModule, TranslatePipeModule],
  declarations: [ProductsComponent, ActionComponent],
  providers: [],
  entryComponents: [ActionComponent]
})
export class ProductModule { }
