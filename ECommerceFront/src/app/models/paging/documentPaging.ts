import { BasePaging } from './basePaging';

export class DocumentPaging extends BasePaging {
    documentType: string;

    constructor(documentType: string) {
        super();
        this.documentType = documentType;
    }
}
