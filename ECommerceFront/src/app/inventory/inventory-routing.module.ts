import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        data: {
            title: 'inventory_breadcrumb'
        },
        children: [
            {
                path: 'products',
                loadChildren: './products/products.module#ProductModule'
            },
            {
                path: 'producttypes',
                loadChildren: './productTypes/productTypes.module#ProductTypesModule'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class InventoryRoutingModule {

}

