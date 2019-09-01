import { Component, ViewChild, AfterViewInit, ViewChildren, EventEmitter } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ActivatedRoute, Router } from '@angular/router';
import { Action } from 'src/app/common/emuns/action';
import { ProductTypeService } from 'src/app/services/productType.service';
import { LoaderComponent } from 'src/app/common/components/loader/loader.component';
import { ProductService } from 'src/app/services/product.service';
import { ToasterComponent } from 'src/app/common/components/toaster/toaster.component';
import { ResponseStatus } from 'src/app/common/models/responseBase';
import { ErrorManagerComponent } from 'src/app/common/components/errorManager/errorManager.component';
import { FormControl, FormArray, FormBuilder } from '@angular/forms';
import { FormGroupHelper } from 'src/app/common/helpers/formGroupHelper';
import { MatDialog, MatSelect } from '@angular/material';
import { ConfirmationModalComponent } from 'src/app/modals/confirmationModal/confirmationModal.component';
import { ModalBase } from 'src/app/common/models/modalBase';
import { ModalBaseComponent } from 'src/app/common/components/modalBase/modalBase.component';
import { DropdownGroup } from 'src/app/common/models/dropdownOption';

@Component({
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.css'],
})
export class ActionComponent extends ErrorManagerComponent implements AfterViewInit {

  constructor(private activatedRoute: ActivatedRoute, private productTypeService: ProductTypeService,
              private productService: ProductService, private router: Router,
              private fb: FormBuilder, private dialog: MatDialog) {
    super();
    this.product = new Product();
    this.productTypes = new Array<DropdownGroup>();
    this.action = this.activatedRoute.snapshot.data.action as Action;
    this.product.productId = this.activatedRoute.snapshot.params.id;
  }

  @ViewChild('loader', { static: false }) loader: LoaderComponent;
  @ViewChild('toaster', { static: false }) toaster: ToasterComponent;
  @ViewChildren('informationValue') informationInput;
  loaderEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();
  product: Product;
  action: Action;
  productTypes: Array<DropdownGroup>;
  images: FormData;
  confirmationModal = new ModalBaseComponent(this.dialog);

  productActionForm = this.fb.group({
    productId: new FormControl(0),
    name: new FormControl(''),
    code: new FormControl(''),
    active: new FormControl(false),
    productType: this.fb.group({
      productTypeId: new FormControl(null)
    }),
    informations: this.fb.array([]),
    images: this.fb.array([])
  });
  // informationsForm = this.fb.group({
  //   value: new FormControl(''),
  //   active: new FormControl(false)
  // });

  getList() {
    this.loader.show();
    this.productTypeService.selectAll().then(res => {
      res.data.forEach(d => {
        this.productTypes.push(new DropdownGroup(d.name, d.children.map(p => ({ code: p.productTypeId, value: p.name }))));
      });
      this.loader.hide();
    }).catch(() => this.loader.hide());
  }

  addNewInformation() {
    this.InformationFormControl.push(this.getNewInformationForm());
    const i = this.InformationFormControl.value.length - 1;
    const Focus = setInterval(() => {
      if (this.informationInput._results[i]) {
        this.informationInput._results[i].nativeElement.focus();
      }
      if (this.informationInput._results[i] && this.informationInput._results[i].nativeElement.id === document.activeElement.id) {
        clearInterval(Focus);
      }
    }, 1);
  }
  deleteInformation(index: number) {
    this.InformationFormControl.removeAt(index);
  }

  deleteImage(index: number) {
    this.imageFormControl.removeAt(index);
  }

  confirm() {
    this.product.asignProduct(FormGroupHelper.mapFormGroupToObject(this.productActionForm, Product));
    this.confirmationModal.openDialog(new ModalBase('confirm_product_title', 'confirm_product_text', null, this.loaderEmitter, () => {
      this.loaderEmitter.emit(true);
      this.productService.insertProduct(this.product).then(res => {
        this.confirmationModal.closeDialog();
        this.loaderEmitter.emit(false);
        if (res.status === ResponseStatus.Error) {
          this.toaster.openSnackBar('Error', ResponseStatus.Error);
          return;
        }
        this.toaster.openSnackBar('Success', ResponseStatus.Success);
        this.router.navigate(['/inventory/products']);
      }).catch(err => {
        this.confirmationModal.closeDialog();
        this.loaderEmitter.emit(false);
        this.addErrors(err, this.productActionForm);
        this.toaster.openSnackBar('Error', ResponseStatus.Error);
      });
    }), ConfirmationModalComponent);
  }

  get InformationFormControl() {
    return this.productActionForm.get('informations') as FormArray;
  }

  get imageFormControl() {
    return this.productActionForm.get('images') as FormArray;
  }

  onFileSelected(event) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      let path: any;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      // tslint:disable-next-line:variable-name
      reader.onload = async (_event) => {
        path = await reader.result;
        this.imageFormControl.push(this.getNewImageForm(file, file.name, path));
      };
    }
  }

  cancel() {
    this.router.navigate(['/inventory/products']);
  }

  ngAfterViewInit() {
    this.getList();
    this.loader.show();
    if (this.action === Action.Edit) {
      this.productService.ProductSelectSingle(this.product.productId).then(res => {
        this.product.asignProduct(res.data);
        FormGroupHelper.mapObjectToFormGroup(this.product, this.productActionForm);
        this.loader.hide();
      });
    }
  }

  // this.dropdown.value = d.children.find(x => x.productTypeId === this.productActionForm.get('productType').get('productTypeId').value)
  getNewImageForm(image: File = null, name: string = null, path: string = null, active = false) {
    return this.fb.group({
      path: new FormControl(path),
      active: new FormControl(active),
      image: new FormControl(image),
      name: new FormControl(name)
    });
  }

  getNewInformationForm() {
    return this.fb.group({
      value: new FormControl(''),
      active: new FormControl(false)
    });
  }
}



