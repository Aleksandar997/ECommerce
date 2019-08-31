import { SortDirection } from 'src/app/common/emuns/sortDIrection';

export class BasePaging {
    sortBy: string;
    sortOrder: string;
    skip: string;
    take: string;
    filter: string;

    constructor() {
        this.defaultSettings();
    }

    static filterOnlyFactory(filter: string) {
        const paging = new BasePaging();
        paging.filter = filter;
        return paging;
    }

    setSkipAndTake(skip: string, take: string) {
        this.skip = skip;
        this.take = take;
    }

    onSortChange(sort) {
        this.sortBy = sort.active;
        this.sortOrder = SortDirection(sort.direction);
    }

    onPageChange(size) {
        this.take = size.pageSize.toString();
        this.skip = (size.pageSize * size.pageIndex).toString();
    }

    defaultSettings() {
        this.sortBy = '';
        this.sortOrder = '1';
        this.skip = '0';
        this.take = '5';
        this.filter = '';
    }

}

