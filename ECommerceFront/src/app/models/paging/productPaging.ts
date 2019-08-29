import { SortDirection } from 'src/app/common/emuns/sortDIrection';

export class ProductPaging {
    sortBy: string;
    sortOrder: string;
    skip: string;
    take: string;
    filter: string;

    constructor() {
        this.defaultSettings();
    }

    static getFilterOnlyObject(filter: string) {
        const paging = new ProductPaging();
        paging.filter = filter;
        return paging;
    }

    onSortChange(sort) {
        this.sortBy = sort.active;
        this.sortOrder = SortDirection(sort.direction);
        console.log(this);
    }

    onPageChange(size) {
        this.take = size.pageSize.toString();
        this.skip = (size.pageSize * size.pageIndex).toString();
    }

    defaultSettings() {
        this.sortBy = 'Name';
        this.sortOrder = '1';
        this.skip = '0';
        this.take = '5';
        this.filter = '';
    }

    pagingToUrl() {
        return `sortBy=${this.sortBy.trim()}&sortOrder=${this
            .sortOrder.trim()}&skip=${this.skip.trim()}&take=${this.take.trim()}&filter=${this.filter.trim()}`;
    }
}

