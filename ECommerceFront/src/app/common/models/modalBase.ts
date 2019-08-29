import { EventEmitter } from '@angular/core';

export class ModalBase {
    title: string;
    text: string;
    data: object;
    onConfirm: () => any | void;
    eventEmitter: EventEmitter<any>;

    constructor(title: string = 'title_default', text: string = null, data: object = null,
                eventEmitter: EventEmitter<any>, onConfirm: () => any | void = null, ) {
        this.title = title;
        this.text = text;
        this.data = data;
        this.onConfirm = onConfirm;
        this.eventEmitter = eventEmitter;
    }
}

