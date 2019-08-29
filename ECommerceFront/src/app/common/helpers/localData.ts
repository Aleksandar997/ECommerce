import { StorageHelper } from './storageHelper';
import { User } from 'src/app/models/user';
import { Culture } from '../models/culture';

export class LocalData {
    private static loginLogalizations: Array<string> = new Array<string>();
    static setToken(token: string) {
        StorageHelper.setData('token', 'bearer ' + token);
    }
    static setExpireToken(expiresIn: number) {
        StorageHelper.setData('expireToken', (new Date().getTime() + expiresIn));
    }
    static setRefreshToken(refreshToken: string) {
        StorageHelper.setData('refreshToken', refreshToken);
    }
    static setUser(user: User) {
        StorageHelper.setData('currentUser', JSON.stringify(user));
    }
    static getUser(): string {
        return StorageHelper.getData('currentUser');
    }
    static isLogged(): boolean {
        return this.getUser() ? true : false;
    }
    static getToken() {
        StorageHelper.getData('token');
    }
    static setLocalization(data: any) {
        StorageHelper.setData('localization', data);
    }
    static getLocalization(cultureId: number = null) {
        return cultureId ? StorageHelper.getData('localization_' + cultureId) : StorageHelper.getData('localization');
    }
    static setLoginLocalization(data: Array<Culture>) {
        data.forEach(dt => {
            this.loginLogalizations.push('localization_' + dt.cultureId);
            StorageHelper.setData('localization_' + dt.cultureId, dt.localizationPair);
        });
    }
    static deleteLoginLocalization() {
        this.loginLogalizations.forEach(l => StorageHelper.deleteData(l));
    }
    private fix() {

    }
}
