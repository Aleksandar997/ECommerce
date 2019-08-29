import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { ResponseStatus as Status} from '../../models/responseBase';

@Component({
    selector: 'toaster',
    template: '',
    styleUrls: ['./toaster.component.css']
})
export class ToasterComponent {
    constructor(private snackBar: MatSnackBar) { }
    openSnackBar(message: string, status: Status, action: string = null) {
        this.snackBar.open(message, action, {
            panelClass: status === Status.Success ? ['success'] : ['error'],
            duration: 2.5 * 1000,
            horizontalPosition: 'right',
            verticalPosition: 'top'
        });
    }
}

