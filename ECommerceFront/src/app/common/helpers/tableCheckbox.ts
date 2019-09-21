import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material';
import { StorageHelper } from './storageHelper';

export class TableCheckbox<T> {

    selection = new SelectionModel<T>(true, []);
    dataSource: Array<T>;
    cacheName: string;
    identityName: string;
    constructor(selection: SelectionModel<T>, dataSource: Array<T>, cacheName: string, identityName: string) {
        this.selection = selection;
        this.dataSource = dataSource;
        this.cacheName = cacheName;
        this.identityName = identityName;
    }
    setData(data: Array<T>) {
        this.dataSource = data;
    }
    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.length;
        return numSelected === numRows || numSelected > numRows;
    }

    masterToggle() {
        if (this.isAllSelected()) {
            this.selection.clear();
            this.dataSource.forEach(row => this.deSelectRow(row));
            return;
        }
        this.dataSource.forEach(row => this.selection.select(row));
        const selectedRows = StorageHelper.getData(this.cacheName);
        if (selectedRows) {
            StorageHelper.setData(this.cacheName, [...selectedRows, ...this.dataSource.map(p => p[this.identityName])]);
            return;
        }
        StorageHelper.setData(this.cacheName, this.dataSource.map(p => p[this.identityName]));
    }
    deSelectRow(deSelectedRow) {
        StorageHelper.setData(this.cacheName, StorageHelper.getData(this.cacheName).filter(p => p !== deSelectedRow[this.identityName]));
    }

    selectRow(selectedRow) {
        if (this.selection.isSelected(selectedRow)) {
            this.deSelectRow(selectedRow);
            return;
        }
        this.selection.toggle(selectedRow);
        let idList = StorageHelper.getData(this.cacheName);
        if (idList) {
            idList = !idList.length ? [idList, selectedRow[this.identityName]] : [...idList, selectedRow[this.identityName]];
            StorageHelper.setData(this.cacheName, idList);
            return;
        }
        StorageHelper.setData(this.cacheName, selectedRow[this.identityName]);
    }

    selectFromCache(objectArray: Array<T>) {
        const data = StorageHelper.getData(this.cacheName);
        const selectedRows: Array<number> = Symbol.iterator in Object(data) ? [...data] : [data];
        const selectedProducts = objectArray.filter(p => selectedRows.includes(p[this.identityName]));
        selectedProducts.forEach(p => this.selection.toggle(p));
    }
}
