import { Component, ViewChild, AfterViewInit, EventEmitter, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product';
import { LoaderComponent } from 'src/app/common/components/loader/loader.component';
import { SelectionModel } from '@angular/cdk/collections';
import { ModalBaseComponent } from 'src/app/common/components/modalBase/modalBase.component';
import { ModalBase } from 'src/app/common/models/modalBase';
import { ConfirmationModalComponent } from 'src/app/modals/confirmationModal/confirmationModal.component';
import { StorageHelper } from 'src/app/common/helpers/storageHelper';
import { ResponseStatus } from 'src/app/common/models/responseBase';
import { ToasterComponent } from 'src/app/common/components/toaster/toaster.component';
import { Router } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Image } from 'src/app/models/image';
import { CarouselBaseList } from 'src/app/common/models/carouselBase';
import { BasePaging } from 'src/app/models/paging/basePaging';

@Component({
  selector: 'product',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ProductsComponent implements AfterViewInit, OnDestroy {
  displayedColumns: string[] = ['name', 'code', 'productType', 'active', 'select', 'edit'];
  selection = new SelectionModel<Product>(true, []);
  dataSource: MatTableDataSource<Product>;
  datasourceLength: number;
  @ViewChild('toaster', { static: false }) toaster: ToasterComponent;
  @ViewChild('loader', { static: false }) loader: LoaderComponent;
  @ViewChild('paginator', { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  expandedElement: Product = null;
  loaderEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();
  confirmationModal = new ModalBaseComponent(this.dialog);
  paging: BasePaging = new BasePaging();
  carouselImages: CarouselBaseList;
  constructor(private productService: ProductService, private dialog: MatDialog, private router: Router) {
    this.dataSource = new MatTableDataSource();
    this.carouselImages = new CarouselBaseList();
  }

  ngAfterViewInit() {
    this.getProducts();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.sort.sortChange.subscribe(s => this.onSortChange(s));
  }

  onSortChange(sort) {
    this.paging.onSortChange(sort);
    this.getProducts();
  }
  onPageChange(size: any) {
    this.paging.onPageChange(size);
    this.getProducts();
  }

  onFilterChange() {
    this.getProducts();
  }

  getProducts() {
    this.loader.show();
    this.productService.ProductSelectAll(this.paging).then(res => {
      this.dataSource = new MatTableDataSource(res.data);
      this.datasourceLength = res.count;
      this.selectFromCache(res.data);
      this.loader.hide();
    }).catch(err => {
      this.loader.hide();
    });
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows || numSelected > numRows;
  }

  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      this.dataSource.data.forEach(row => this.deSelectRow(row));
      return;
    }
    this.dataSource.data.forEach(row => this.selection.select(row));
    const selectedRows = StorageHelper.getData('selectedProducts');
    if (selectedRows) {
      StorageHelper.setData('selectedProducts', [...selectedRows, ...this.dataSource.data.map(p => p.productId)]);
      return;
    }
    StorageHelper.setData('selectedProducts', this.dataSource.data.map(p => p.productId));
  }

  selectRow(selectedRow) {
    if (this.selection.isSelected(selectedRow)) {
      this.deSelectRow(selectedRow);
      return;
    }
    this.selection.toggle(selectedRow);
    let idList = StorageHelper.getData('selectedProducts');
    if (idList) {
      idList = !idList.length ? [idList, selectedRow.productId] : [...idList, selectedRow.productId];
      StorageHelper.setData('selectedProducts', idList);
      return;
    }
    StorageHelper.setData('selectedProducts', selectedRow.productId);
  }

  deSelectRow(deSelectedRow) {
    StorageHelper.setData('selectedProducts', StorageHelper.getData('selectedProducts').filter(p => p !== deSelectedRow.productId));
  }

  selectFromCache(products: Array<Product>) {
    const data = StorageHelper.getData('selectedProducts');
    const selectedRows: Array<number> = Symbol.iterator in Object(data) ? [...data] : [data];
    const selectedProducts = products.filter(p => selectedRows.includes(p.productId));
    selectedProducts.forEach(p => this.selection.toggle(p));
  }

  deleteSelected() {
    this.confirmationModal.openDialog(new ModalBase('delete_product_title', 'delete_product_text', null, this.loaderEmitter, () => {
      this.loaderEmitter.emit(true);
      const selectedProducts = StorageHelper.getData('selectedProducts');
      this.productService.ProductDelete(selectedProducts.length ? selectedProducts : [selectedProducts], this.paging).then(res => {
        StorageHelper.deleteData('selectedProducts');
        this.dataSource = new MatTableDataSource(res.data);
        this.datasourceLength = res.count;
        this.confirmationModal.closeDialog();
        this.loaderEmitter.emit(false);
        if (res.status === ResponseStatus.Error) {
          this.toaster.openSnackBar('Error', ResponseStatus.Error);
          return;
        }
        this.toaster.openSnackBar('Success', ResponseStatus.Success);
        // this.loader.hide();
      }).catch(err => {
        this.loaderEmitter.emit(false);
        this.toaster.openSnackBar('Error', ResponseStatus.Error);
        // this.confirmationModal.closeDialog();
        // this.loader.hide();
      });
    }), ConfirmationModalComponent);
  }

  expandRow(row) {
    this.carouselImages.populate(row.images);
    this.expandedElement = this.expandedElement === row ? null : row;
  }

  ngOnDestroy() {
    StorageHelper.deleteData('selectedProducts');
  }
}

// export class TableExpandableRowsExample {
//   dataSource = ELEMENT_DATA;
//   columnsToDisplay = ['name', 'weight', 'symbol', 'position'];
//   expandedElement: PeriodicElement | null;
// }
