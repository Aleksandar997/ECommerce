export class DocumentStatus {
    documentStatusId: number;
    code: string;
    value: string;
    active: boolean;

    constructor() {
        this.documentStatusId = null;
        this.code = '';
        this.value = '';
        this.active = false;
    }
}
