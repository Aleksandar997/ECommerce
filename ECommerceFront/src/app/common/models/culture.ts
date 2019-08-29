import { LocalizationEntity } from './localizationEntity';

export class Culture {
    cultureId: number;
    name: string;
    value: string;
    flag: string;
    localizationPair: any;
    active: boolean;

    constructor(name: string, value: string, flag: string) {
        this.name = name;
        this.value = value;
        this.flag = flag;
        this.localizationPair = [];
    }
}
