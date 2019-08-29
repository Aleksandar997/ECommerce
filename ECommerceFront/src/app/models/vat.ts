export class Vat {
    vatId: number;
    code: string;
    value: string;
    active: boolean;

    constructor() {
        this.vatId = null;
        this.code = '';
        this.value = '';
        this.active = false;
    }
}
