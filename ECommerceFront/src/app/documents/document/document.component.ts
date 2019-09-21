import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ChangeDetectorRef, ApplicationRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, Observable, Subscription } from 'rxjs';
import { DocumentService } from 'src/app/services/document.service';
import { DocumentPaging } from 'src/app/models/paging/documentPaging';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Document } from 'src/app/models/document';
import { LoaderComponent } from 'src/app/common/components/loader/loader.component';
import { ToasterComponent } from 'src/app/common/components/toaster/toaster.component';
import { ResponseStatus } from 'src/app/common/models/responseBase';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { DocumentDetail } from 'src/app/models/documentDetail';
import { timeInterval } from 'rxjs/operators';
import { BasePaging } from 'src/app/models/paging/basePaging';
import { DetailPaging } from 'src/app/models/paging/detailPaging';
import { SelectionModel } from '@angular/cdk/collections';
import { StorageHelper } from 'src/app/common/helpers/storageHelper';
import { TableCheckbox } from 'src/app/common/helpers/tableCheckbox';

@Component({
  selector: 'document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class DocumentComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('paginator', { static: true }) paginator: MatPaginator;
  @ViewChild('detailsPaginator', { static: true }) detailsPaginator: MatPaginator;
  @ViewChild('loader', {static: false}) loader: LoaderComponent;
  @ViewChild('toaster', { static: false }) toaster: ToasterComponent;
  tableCheckbox: TableCheckbox<Document>;
  documentType: string;
  routeSub: Subscription;
  paging: DocumentPaging;
  detailsPaging: DetailPaging;
  documentDatasourceLength: number;
  detailsDatasourceLength: number;
  documentDataSource: MatTableDataSource<Document>;
  detailsDataSource: MatTableDataSource<DocumentDetail>;
  documentDisplayedColumns: string[] = ['code', 'documentType', 'documentStatus', 'date', 'sum', 'customer', 'select', 'edit'];
  detailsDisplayColumns: string[] = ['product', 'quantity', 'vat', 'price', 'discount', 'priceWithDiscount', 'sum'];
  expandedElement: Document = null;
  constructor(private activatedRoute: ActivatedRoute, private documentService: DocumentService, private cdRef: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.routeSub = this.activatedRoute.params.subscribe(param => {
      if (param.type) {
        this.documentType = param.type;
        this.paging = new DocumentPaging(this.documentType);
        this.detailsPaging = new DetailPaging();
        this.activatedRoute.snapshot.data.title = this.documentType + this.activatedRoute.snapshot.data.title;
        this.documentDataSource = new MatTableDataSource<Document>();
        this.detailsDataSource = new MatTableDataSource<DocumentDetail>();
        this.tableCheckbox = new TableCheckbox(
          new SelectionModel<Document>(), this.documentDataSource.data, 'selectedDocuments', 'documentId');
        if (this.documentType === 'pricelist') {
          this.documentDisplayedColumns = ['code', 'documentType', 'documentStatus', 'date', 'select', 'edit'];
          this.detailsDisplayColumns = ['product', 'price'];
        }
        if (this.loader) {
          this.afterRender();
        }
      }
    });
  }

  onFilterChange() {
    this.getDocuments();
  }

  onPageChange(size: any) {
    this.paging.onPageChange(size);
    this.getDocuments();
  }

  onDetailPageChange(size: any) {
    this.detailsPaging.onPageChange(size);
    this.getDetails();
  }

  getDocuments() {
    this.loader.show();
    this.documentService.selectAll(this.paging).then(res => {
      this.documentDatasourceLength = res.count;
      this.documentDataSource = new MatTableDataSource<Document>(res.data);
      this.tableCheckbox.setData(res.data);
      this.loader.hide();
    }).catch(err => {
      console.log(err);
      this.loader.hide();
      this.toaster.openSnackBar('Error', ResponseStatus.Error);
    });
  }

  afterRender() {
    this.getDocuments();
    this.documentDataSource.paginator = this.paginator;
  }

  ngAfterViewInit() {
    this.afterRender();
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  expandRow(row: Document) {
    this.loader.show();
    this.expandedElement = this.expandedElement === row ? null : row;
    if (this.expandedElement) {
      this.detailsPaging.init('0', '5', this.expandedElement.documentId);
      this.getDetails();
    }
    // this.detailsDataSource.data = this.expandedElement.documentDetails;
  }

  getDetails() {
    this.documentService.detailsSelectAllByDocument(this.detailsPaging).then(res => {
      this.detailsDatasourceLength = res.count;
      this.detailsDataSource = new MatTableDataSource<DocumentDetail>(res.data);
      this.loader.hide();
    }).catch(err => {
      this.loader.hide();
      this.toaster.openSnackBar('Error', ResponseStatus.Error);
    });
  }
}
