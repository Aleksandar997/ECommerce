import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductTypesComponent } from './productTypes.component';

const routes: Routes = [
    {
        path: '',
        component: ProductTypesComponent,
        data: {
            title: 'products_types_breadcrumb'
        },
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProductTypesRoutingModule {

}

