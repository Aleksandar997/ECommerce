export class DocumentType {
    documentTypeId: number;
    code: string;
    value: string;
    active: boolean;

    constructor() {
        this.documentTypeId = null;
        this.code = '';
        this.value = '';
        this.active = false;
    }
}
