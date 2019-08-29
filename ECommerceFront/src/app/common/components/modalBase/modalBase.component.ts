import { Component, ReflectiveInjector, EventEmitter } from '@angular/core';
import { ModalBase } from '../../models/modalBase';
import { MatDialog } from '@angular/material';



@Component({
    template: ''
})
export class ModalBaseComponent {
    constructor(private matDialog: MatDialog) {
    }

    private dialogRef;
    onClose: EventEmitter<any> = new EventEmitter();
    openDialog(modalBase: ModalBase, type: any): any | void {
        this.dialogRef = this.matDialog.open(type, {
            panelClass: 'test',
            data: modalBase
        });
        this.dialogRef.afterClosed().subscribe(result => {
            this.onClose.emit(result);
        });
    }


    closeDialog(): any | void {
        this.matDialog.closeAll();
    }

}
