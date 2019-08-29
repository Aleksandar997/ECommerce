import { Component, ChangeDetectorRef } from '@angular/core';

@Component({
    selector: 'loader',
    templateUrl: 'loader.component.html',
    styleUrls: ['./loader.component.css'],
    exportAs: 'loader'
})

export class LoaderComponent {
    constructor(private cdRef: ChangeDetectorRef) {
    }
    showLoader = false;
    show() {
        if (!this.showLoader) {
            this.showLoader = true;
            this.cdRef.detectChanges();
        }
    }

    hide() {
        if (this.showLoader) {
            this.showLoader = false;
        }
    }
}

