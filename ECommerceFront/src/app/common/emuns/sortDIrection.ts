export function SortDirection(sortCode: string): string {
    let order = '0';
    switch (sortCode) {
        case 'asc':
            order = '1';
            break;
        case 'desc':
            order = '2';
            break;
    }
    return order;
}
