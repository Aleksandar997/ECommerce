import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DocumentComponent } from './document.component';
import { Action } from 'src/app/common/emuns/action';
import { ActionComponent } from './action/action.component';


const routes: Routes = [
    {
        path: '',
        component: DocumentComponent,
        data: {
            title: '_breadcrumb'
        },
    },
    {
        path: 'add',
        component: ActionComponent,
        data: {
            title: 'document_breadcrumb;add_breadcrumb',
            action: Action.Add
        }
    },
    {
        path: 'edit/:id',
        component: ActionComponent,
        data: {
            title: 'document_breadcrumb;edit_breadcrumb',
            action: Action.Edit
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DocumentRoutingModule {

}

