import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './products.component';
import { ActionComponent } from './action/action.component';
import { Action } from 'src/app/common/emuns/action';

const routes: Routes = [
    {
        path: '',
        component: ProductsComponent,
        data: {
            title: 'products_breadcrumb'
        },
    },
    {
        path: 'add',
        component: ActionComponent,
        data: {
            title: 'products_breadcrumb;add_breadcrumb',
            action: Action.Add
        }
    },
    {
        path: 'edit/:id',
        component: ActionComponent,
        data: {
            title: 'products_breadcrumb;edit_breadcrumb',
            action: Action.Edit
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProductsRoutingModule {

}

