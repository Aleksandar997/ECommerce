import { Product } from './product';
import { Vat } from './vat';

export class DocumentDetail {
    documentType: string;
    documentDetailId: number;
    product: Product;
    quantity: number;
    vat: Vat;
    price: number;
    discount: number;
    priceWithDiscount: number;
    sum: number;
    constructor() {
        this.documentDetailId = null;
        this.product = new Product();
        this.quantity = null;
        this.vat = new Vat();
        this.price = null;
        this.discount = null;
        this.priceWithDiscount = null;
        this.sum = null;
        this.documentType = null;
    }
    assignObject(init?: Partial<DocumentDetail>) {
        Object.assign(this, init);
    }
}
