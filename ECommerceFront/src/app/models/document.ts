import { DocumentStatus } from './documentStatus';
import { DocumentDetail } from './documentDetail';
import { DocumentType } from './documentType';

export class Document {
    documentId: number;
    code: string;
    date: Date;
    sum: number;
    documentStatus: DocumentStatus;
    documentType: DocumentType;
    documentDetails: Array<DocumentDetail>;
    constructor() {
        this.documentId = null;
        this.code = '';
        this.date = new Date();
        this.sum = 0;
        this.documentStatus = new DocumentStatus();
        this.documentType = new DocumentType();
        this.documentDetails = new Array<DocumentDetail>();
    }

    assignObject(init?: Partial<Document>) {
        Object.assign(this, init);
        // Object.assign(this.documentDetails, init.documentDetails);
    }

    // assignObject(document: Document) {
    //     t
    // }
}
