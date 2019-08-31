import { BasePaging } from './basePaging';

export class DetailPaging extends BasePaging {
    documentId: number;

    constructor() {
        super();
    }

    init(skip: string, take: string, documentId: number) {
        this.skip = skip;
        this.take = take;
        this.documentId = documentId;
    }
}
