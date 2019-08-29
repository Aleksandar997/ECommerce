export class ProductType {
    productTypeId: number;
    name: string;
    active: boolean;
    children: Array<ProductType>;
    parentId: number;
    touched: boolean;
    toBeDeleted: boolean;
    // expandable = () => this.children && this.children.length > 0;
    // getChildren = () => this.children;
    constructor(parentId = 0,
                touched = false) {
        this.productTypeId = 0;
        this.name = '';
        this.active = false;
        this.children = new Array<ProductType>();
        this.parentId = parentId;
        this.touched = touched;
        this.toBeDeleted = false;
    }
}

