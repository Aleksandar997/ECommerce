export class Menu {
    menuId: number;
    parentId: number;
    code: string;
    name: string;
    url: string;
    image: string;
    sort: number;
    active: boolean;
    expanded: boolean;
    children: Array<Menu>;

    constructor() {
        this.expanded = false;
    }
}
