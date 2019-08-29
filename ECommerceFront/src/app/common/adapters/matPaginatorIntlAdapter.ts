import { MatPaginatorIntl } from '@angular/material';
import { TranslatePipe } from '../pipes/translate/translatePipe';

export class MatPaginatorIntlLocalized extends MatPaginatorIntl {
    constructor(private translate: TranslatePipe) {
        super();
    }
    itemsPerPageLabel = this.translate.getTranslate('label_items_per_page');
    nextPageLabel = this.translate.getTranslate('label_next_page');
    previousPageLabel = this.translate.getTranslate('label_previous_page');

    getRangeLabel = (page: number, pageSize: number, length: number) => {
        return ((page * pageSize) + 1) + ' - ' + ((page * pageSize) + pageSize) + ` ${this.translate.getTranslate('label_of')} ` + length;
    }
}
