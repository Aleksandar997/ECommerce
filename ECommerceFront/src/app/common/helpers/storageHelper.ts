export class StorageHelper {
    // session data
    static setData(name: string, data: any) {
        sessionStorage.setItem(name + '.CacheData', JSON.stringify(data));
    }
    static getData(name: string) {
        return JSON.parse(sessionStorage.getItem(name + '.CacheData'));
    }
    static deleteData(name: string) {
        sessionStorage.removeItem(name + '.CacheData');
    }
}
