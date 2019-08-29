import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        data: {
            title: 'documents_breadcrumb'
        },
        children: [
            {
                path: ':type',
                loadChildren: './document/document.module#DocumentModule'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DocumentsRoutingModule {

}

