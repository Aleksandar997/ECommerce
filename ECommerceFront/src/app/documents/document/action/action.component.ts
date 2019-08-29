import { Component, OnInit, ViewChildren, EventEmitter, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormArray, FormGroup } from '@angular/forms';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { Action } from 'src/app/common/emuns/action';
import { DocumentStatusService } from 'src/app/services/documentStatus.service';
import { DropdownOption } from 'src/app/common/models/dropdownOption';
import { VatService } from 'src/app/services/vat.service';
import { ProductService } from 'src/app/services/product.service';
import { ProductPaging } from 'src/app/models/paging/productPaging';
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
import { DocumentDetail } from 'src/app/models/documentDetail';

@Component({
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.css']
})
export class ActionComponent extends ErrorManagerComponent implements OnInit, AfterViewInit {

  @ViewChildren('productSelect') productSelect;
  @ViewChild('toaster', { static: false }) toaster: ToasterComponent;
  @ViewChild('loader', {static: false}) loader: LoaderComponent;
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
  }
  documentType: string;
  detailsDatasource = new MatTableDataSource<any>();
  confirmationModal = new ModalBaseComponent(this.dialog);
  loaderEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();
  // detailsDisplayColumns = ['productName', 'quantity', 'vat', 'price', 'discount', 'isPercentage', 'priceWithDiscount', 'sum'];
  detailsDisplayColumns = ['productName', 'quantity', 'vat', 'price', 'discount', 'priceWithDiscount', 'sum'];
  action: Action;
  documentStatuses: Array<DropdownOption>;
  vats: Array<DropdownOption>;
  products: Array<Array<DropdownOption>>;
  customers: Array<DropdownOption>;
  documentActionForm = this.fb.group({
    documentId: new FormControl(0),
    code: new FormControl({ value: '', disabled: true }),
    date: new FormControl(new Date()),
    sum: new FormControl({ value: 0, disabled: true }),
    documentStatus: this.fb.group({
      code: new FormControl(null),
    }),
    customer: this.fb.group({
      customerId: new FormControl(0)
    }),
    documentType: this.fb.group({
      code: new FormControl(this.activatedRoute.snapshot.params.type)
    }),
    documentDetails: this.fb.array([])
  });

  ngOnInit() {
    this.addNewDetail();
  }

  ngAfterViewInit() {
    this.getLists();
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
      res.data.forEach(c => this.customers.push(new DropdownOption(c.customerId.toString(), `${c.firstName} ${c.lastName}`)));
      this.loader.hide();
    }).catch(() => this.loader.hide());
  }

  get getDocumentDetails() {
    return this.documentActionForm.get('documentDetails') as FormArray;
  }

  addNewDetail() {
    this.products.push(new Array<DropdownOption>());
    this.getDocumentDetails.push(this.getEmptyDetail());
    this.detailsDatasource.data = this.getDocumentDetails.controls;
  }

  onInputChange(index: number, inputValue: string) {
    this.products[index] = new Array<DropdownOption>();
    if (inputValue.length === 0) {
      return;
    }
    this.productService.selectAllByFilter(ProductPaging.getFilterOnlyObject(inputValue)).then(res => {
      res.data.forEach(p => {
        const option = new DropdownOption(p.code, p.name);
        this.products[index].push(option);
      });
    });
  }

  getEmptyDetail() {
    return this.fb.group({
      documentDetailId: new FormControl(0),
      product: this.fb.group({
        code: new FormControl(null)
      }),
      quantity: new FormControl(null),
      vat: this.fb.group({
        code: new FormControl(null)
      }),
      price: new FormControl(null),
      discount: new FormControl(null),
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
    // Object.assign(document, FormGroupHelper.mapFormGroupToObject(this.documentActionForm, Document) as Document)
    document = FormGroupHelper.mapFormGroupToObject(this.documentActionForm, Document);
    document.documentDetails[0] = new DocumentDetail();
    // document.assignObject(this.documentActionForm.getRawValue());
    this.confirmationModal.openDialog(new ModalBase('confirm_document_title', 'confirm_document_title', null, this.loaderEmitter, () => {
      this.loaderEmitter.emit(true);
      this.documentService.postObject(this.documentActionForm.getRawValue()).then(res => {
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
      pwd && pwd !== 0 && quantity && quantity !== 0 ? (pwd * quantity) : null
    );
  }

  calculatePriceWithDiscount(detail: FormGroup) {
    const value: number = detail.get('discount').value;

    const price = detail.get('price').value;
    detail.get('priceWithDiscount').setValue(
      price && price !== 0 && value && value !== 0 ? (price - ((value * price) / 100)) : null
    );
    return;
    // const value: number = detail.get('discount').value;
    // if (detail.get('isPercentage').value) {
    //   const price = detail.get('price').value;
    //   detail.get('priceWithDiscount').setValue((price - ((value * price) / 100)));
    //   return;
    // }
    // detail.get('priceWithDiscount').setValue(
    //   detail.get('discount').value !== 0 ? (detail.get('price').value - detail.get('discount').value) : detail.get('price').value
    // );
  }

  calculateDocumentSum(detail: FormGroup) {
    let sum = 0;
    let areSumsZero = true;
    this.getDocumentDetails.controls.forEach(dd => {
      const ddSum = dd.get('sum').value;
      if (ddSum !== 0 && ddSum != null) {
        areSumsZero = false;
      }
      if (ddSum !== 0) {
        sum += ddSum;
      }
    });
    sum = areSumsZero ? null : sum;
    if (sum !== 0) {
      this.documentActionForm.get('sum').setValue(sum);
    }
  }

}