import { Pipe, PipeTransform } from '@angular/core';
import { LocalData } from '../../helpers/localData';


@Pipe({ name: 'translate' })
export class TranslatePipe implements PipeTransform {
    localization: any;
    constructor() {
        this.localization = LocalData.getLocalization();
    }

    transform(value: string, cultureId: number = null): string {
        if (cultureId) {
            this.localization = LocalData.getLocalization(cultureId);
        }
        return this.localization ? (this.localization[value] ? this.localization[value] : value) : value;
    }

    getTranslate(value: string, cultureId: number = null): string {
        return this.transform(value, cultureId);
    }
}
