import { DocumentStatus } from './documentStatus';
import { DocumentDetail } from './documentDetail';
import { DocumentType } from './documentType';
import { Customer } from './customer';

export class Document {
    documentId: number;
    code: string;
    date: Date;
    sum: number;
    documentStatus: DocumentStatus;
    documentType: DocumentType;
    documentDetails: Array<DocumentDetail>;
    customer: Customer;

    constructor() {
        this.documentId = null;
        this.code = '';
        this.date = new Date();
        this.sum = 0;
        this.documentStatus = new DocumentStatus();
        this.documentType = new DocumentType();
        this.documentDetails = new Array<DocumentDetail>();
        this.customer = new Customer();
    }

    assignObject(init?: Partial<Document>) {
        Object.assign(this.customer, init.customer);
        Object.assign(this.documentStatus, init.documentStatus);
        Object.assign(this.documentType, init.documentType);
        Object.assign(this.documentDetails, init.documentDetails);
        Object.assign(this, init);
        // Object.assign(this.documentDetails, init.documentDetails);
    }

    // assignObject(document: Document) {
    //     t
    // }
}
