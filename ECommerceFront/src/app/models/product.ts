import { Information } from './information';
import { ProductType } from './productType';
import { Image } from './image';
import { UploadFileInfo } from './uploadFileInfo';

export class Product {
    productId: number;
    name: string;
    code: string;
    productType: ProductType;
    active: boolean;
    informations: Array<Information>;
    images: Array<Image>;

    constructor() {
        this.name = '';
        this.code = '';
        this.informations = new Array<Information>();
        this.active = false;
        this.images = new Array<Image>();
        this.productType = new ProductType();
    }

    asignProduct(product) {
        if (!product) {
            return;
        }
        this.name = product.name ? product.name : this.name;
        this.code = product.code ? product.code : this.code;
        if (product.productType && product.productType.productTypeId > 0) {
            this.productType.productTypeId = +product.productType.productTypeId;
        }
        this.active = product.active ? product.active : this.active;
        this.informations = product.informations.length > 0 ? product.informations : this.informations;
        this.images = product.images.length ? product.images : this.images;
    }

    getFormData(): FormData {
        const formData = new FormData();
        this.images.forEach(img => formData.append(img.name, img.image));
        return formData;
    }

    addImageNames(imageInfo: Array<UploadFileInfo>) {
        this.images.forEach(img => {
            const imgInfo = imageInfo.find(i => i.pastName === img.name);
            if (imgInfo) {
                img.name = imgInfo.currentName;
                img.path = null;
            }
        });
    }
}
