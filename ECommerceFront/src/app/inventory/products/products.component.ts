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
import { TableCheckbox } from 'src/app/common/helpers/tableCheckbox';

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
  tableCheckbox: TableCheckbox<Product>;
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
    this.tableCheckbox = new TableCheckbox(this.selection, this.dataSource.data, 'selectedProducts', 'productId');
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
      this.datasourceLength = res.count;
      this.dataSource = new MatTableDataSource(res.data);
      this.tableCheckbox.setData(this.dataSource.data);
      this.tableCheckbox.selectFromCache(this.dataSource.data);
      // this.selectFromCache(res.data);
      this.loader.hide();
    }).catch(err => {
      this.loader.hide();
    });
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
    this.carouselImages.clear();
    this.carouselImages.populate(Object.create(row.images));
    this.expandedElement = this.expandedElement === row ? null : row;
  }

  ngOnDestroy() {
    StorageHelper.deleteData('selectedProducts');
  }
}
