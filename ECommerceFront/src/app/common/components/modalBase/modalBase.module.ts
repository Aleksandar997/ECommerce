import { NgModule } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';
import { ModalBaseComponent } from './modalBase.component';
import { ConfirmationModalComponent } from 'src/app/modals/confirmationModal/confirmationModal.component';
import { ConfirmationModalModule } from 'src/app/modals/confirmationModal/confirmationModal.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@NgModule({
    imports: [MaterialModule, ConfirmationModalModule, CommonModule, FormsModule],
    declarations: [
        ModalBaseComponent
    ],
    entryComponents: [
        ConfirmationModalComponent
    ],
    exports: [ModalBaseComponent]
})
export class ModalBaseModule { }
