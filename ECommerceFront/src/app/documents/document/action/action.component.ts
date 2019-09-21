import { Component, OnInit, ViewChildren, EventEmitter, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormArray, FormGroup } from '@angular/forms';
import { MatDialog, MatTableDataSource, MatPaginator } from '@angular/material';
import { Action } from 'src/app/common/emuns/action';
import { DocumentStatusService } from 'src/app/services/documentStatus.service';
import { DropdownOption } from 'src/app/common/models/dropdownOption';
import { VatService } from 'src/app/services/vat.service';
import { ProductService } from 'src/app/services/product.service';
import { FormGroupHelper } from 'src/app/common/helpers/formGroupHelper';
import { Document } from 'src/app/models/document';
import { ConfirmationModalComponent } from 'src/app/modals/confirmationModal/confirmationModal.component';
import { ModalBaseComponent } from 'src/app/common/components/modalBase/modalBase.component';
import { ModalBase } from 'src/app/common/models/modalBase';
import { ResponseStatus } from 'src/app/common/models/responseBase';
import { ToasterComponent } from 'src/app/common/components/toaster/toaster.component';
import { ErrorManagerComponent } from 'src/app/common/components/errorManager/errorManager.component';
import { CustomerService } from 'src/app/services/customer.service';
import { DocumentService } from 'src/app/services/document.service';
import { LoaderComponent } from 'src/app/common/components/loader/loader.component';
import { BasePaging } from 'src/app/models/paging/basePaging';
import { DetailPaging } from 'src/app/models/paging/detailPaging';

@Component({
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.css']
})
export class ActionComponent extends ErrorManagerComponent implements OnInit, AfterViewInit {

  @ViewChildren('productSelect') productSelect;
  @ViewChild('toaster', { static: false }) toaster: ToasterComponent;
  @ViewChild('loader', { static: false }) loader: LoaderComponent;
  constructor(private activatedRoute: ActivatedRoute, private fb: FormBuilder, private vatService: VatService, private router: Router,
              private dialog: MatDialog, private documentStatusService: DocumentStatusService, private productService: ProductService,
              private documentService: DocumentService, private customerService: CustomerService) {
    super();
    this.action = this.activatedRoute.snapshot.data.action as Action;
    this.documentType = this.activatedRoute.snapshot.params.type;
    this.documentStatuses = new Array<DropdownOption>();
    this.vats = new Array<DropdownOption>();
    this.products = new Array<Array<DropdownOption>>();
    this.customers = new Array<DropdownOption>();
    this.documentId = this.activatedRoute.snapshot.params.id;
    this.paging = new DetailPaging();
  }
  document: Document;
  documentId: number;
  paging: DetailPaging;
  documentType: string;
  detailsDatasourceLength = 0;
  detailsDatasource = new MatTableDataSource<any>();
  confirmationModal = new ModalBaseComponent(this.dialog);
  loaderEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();
  action: Action;
  documentStatuses: Array<DropdownOption>;
  vats: Array<DropdownOption>;
  products: Array<Array<DropdownOption>>;
  customers: Array<DropdownOption>;
  documentActionForm = this.fb.group({
    documentId: new FormControl(0),
    code: new FormControl({ value: null, disabled: true }),
    date: new FormControl(new Date()),
    sum: new FormControl({ value: 0, disabled: true }),
    documentStatus: this.fb.group({
      code: new FormControl(null),

      documentStatusId: new FormControl(0),
      value: new FormControl(null),
      active: new FormControl(false),
    }),
    customer: this.fb.group({
      customerId: new FormControl(null),

      firstName: new FormControl(null),
      lastName: new FormControl(null),
      address: new FormControl(null),
      floor: new FormControl(null),
      flat: new FormControl(null),
      contactNumber: new FormControl(null),
    }),
    documentType: this.fb.group({
      code: new FormControl(this.activatedRoute.snapshot.params.type),

      documentTypeId: new FormControl(0),
      value: new FormControl(null),
      active: new FormControl(false),
    }),
    documentDetails: this.fb.array([])
  });

  ngOnInit() {
    if (this.checkIfType('bill')) {
      FormGroupHelper.setDisabledProps(['sum',
                                        'documentDetails.sum',
                                        'documentDetails.priceWithDiscount',
                                        'code']);
    }
  }

  ngAfterViewInit() {
    this.getLists();
    if (this.action === Action.Edit) {
      this.paging.init('0', '5', this.documentId);
      this.documentService.selectByDocumentId(this.paging).then(res => {
        this.detailsDatasourceLength = res.count;
        FormGroupHelper.mapObjectToFormGroup(res.data, this.documentActionForm);
        this.loader.hide();
      }).catch(err => {
        this.loader.hide();
        this.toaster.openSnackBar('Error', ResponseStatus.Error);
      });
    }
    // this.addNewDetail();
  }

  getLists() {
    this.loader.show();
    this.documentStatusService.selectAll().then(res => {
      res.data.forEach(status => this.documentStatuses.push(new DropdownOption(status.code, status.value)));
    }).catch(() => this.loader.hide());
    this.vatService.selectAll().then(res => {
      res.data.forEach(vat => this.vats.push(new DropdownOption(vat.code, (vat.code + '%'))));
    }).catch(() => this.loader.hide());
    this.customerService.selectAll().then(res => {
      res.data.forEach(c => this.customers.push(new DropdownOption(c.customerId, `${c.firstName} ${c.lastName}`)));
      if (this.action !== Action.Edit) {
        this.loader.hide();
      }
    }).catch(() => this.loader.hide());
  }

  get getDocumentDetails() {
    return this.documentActionForm.get('documentDetails') as FormArray;
  }

  addNewDetail() {
    this.detailsDatasourceLength++;
    this.products.unshift(new Array<DropdownOption>());
    this.getDocumentDetails.insert(0, this.getEmptyDetail());
    // this.getDocumentDetails.removeAt(this.getDocumentDetails.value.length - 1);
    this.detailsDatasource.data = this.getDocumentDetails.controls;
  }

  onInputChange(index: number, inputValue: string) {
    this.products[index] = new Array<DropdownOption>();
    if (inputValue.length === 0) {
      return;
    }
    this.productService.selectAllByFilter(BasePaging.filterOnlyFactory(inputValue)).then(res => {
      res.data.forEach(p => {
        const option = new DropdownOption(p.code, p.name);
        this.products[index].push(option);
      });
    });
  }

  getEmptyDetail() {
    return this.fb.group({
      documentDetailId: new FormControl(0),
      documentType: new FormControl(this.activatedRoute.snapshot.params.type),
      product: this.fb.group({
        code: new FormControl(null)
      }),
      quantity: new FormControl(null),
      vat: this.fb.group({
        code: new FormControl(null)
      }),
      price: new FormControl(null),
      discount: new FormControl(0),
      isPercentage: new FormControl(false),
      priceWithDiscount: new FormControl({ value: null, disabled: true }),
      sum: new FormControl({ value: null, disabled: true })
    });
  }

  cancel() {
    this.router.navigate([`/documents/${this.documentType}`]);
  }

  confirm() {
    let document = new Document();
    document = FormGroupHelper.mapFormGroupToObject(this.documentActionForm, Document);
    console.log(document);
    this.confirmationModal.openDialog(new ModalBase('confirm_document_title', 'confirm_document_title', null, this.loaderEmitter, () => {
      this.loaderEmitter.emit(true);
      this.documentService.postObject(document).then(res => {
        this.confirmationModal.closeDialog();
        if (res.status === ResponseStatus.Error) {
          this.toaster.openSnackBar('Error', ResponseStatus.Error);
          return;
        }
        this.toaster.openSnackBar('Success', ResponseStatus.Success);
        this.cancel();
      }).catch(err => {
        console.log(err);
        this.confirmationModal.closeDialog();
        this.loaderEmitter.emit(false);
        this.addErrors(err, this.documentActionForm);
        this.toaster.openSnackBar('Error', ResponseStatus.Error);
      });
    }), ConfirmationModalComponent);
  }

  detailCalculation(detail: FormGroup) {
    this.calculatePriceWithDiscount(detail);
    this.calculateDetailSum(detail);
  }

  calculateDetailSum(detail: FormGroup) {
    const pwd = detail.get('priceWithDiscount').value;
    const quantity = detail.get('quantity').value;
    detail.get('sum').setValue(
      pwd * quantity
    );
  }

  calculatePriceWithDiscount(detail: FormGroup) {
    const value: number = detail.get('discount').value;
    const price = detail.get('price').value;
    detail.get('priceWithDiscount').setValue(
      price - ((value * price) / 100)
    );
    return;
  }

  calculateDocumentSum(detail: FormGroup) {
    let sum = 0;
    let areSumsZero = true;
    this.getDocumentDetails.controls.forEach(dd => {
      const ddSum = dd.get('sum').value;
      areSumsZero = false;
      sum += ddSum;
    });
    sum = areSumsZero ? null : sum;
    this.documentActionForm.get('sum').setValue(sum);
  }

  deleteDetail(index: number) {
    this.getDocumentDetails.removeAt(index);
  }

  getDetails() {
    this.loader.show();
    this.documentService.detailsSelectAllByDocument(this.paging).then(res => {
      this.detailsDatasourceLength = res.count;
      FormGroupHelper.mapArrayToFormArray(res.data, this.getDocumentDetails, 'documentDetails');
      this.loader.hide();
    }).catch(err => {
      this.loader.hide();
      this.toaster.openSnackBar('Error', ResponseStatus.Error);
    });
  }

  onPageChange(size: any) {
    this.paging.onPageChange(size);
    this.getDetails();
  }

  checkIfType(type: string) {
    return type === this.documentType;
  }

}
