import { NgModule } from '@angular/core';
import { ConfirmationModalComponent } from 'src/app/modals/confirmationModal/confirmationModal.component';
import { MatDialogModule, MatButtonModule, MatDividerModule } from '@angular/material';
import { LoaderModule } from 'src/app/common/components/loader/loader.module';


@NgModule({
    imports: [
        MatDialogModule, MatButtonModule, MatDividerModule, LoaderModule
    ],
    declarations: [
        ConfirmationModalComponent
    ],
    exports: [ConfirmationModalComponent]
})
export class ConfirmationModalModule { }
