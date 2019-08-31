export class PagingHelper {
    static ToUrlQueryParam(paging: any) {
        let pagingQuery = '';
        const pagingKeys = Object.keys(paging);
        pagingKeys.forEach(p => {
            pagingQuery += pagingKeys.indexOf(p) === pagingKeys.length - 1 ? `${p}=${paging[p]}` : `${p}=${paging[p]}&`;
        });
        return pagingQuery;
    }
}
