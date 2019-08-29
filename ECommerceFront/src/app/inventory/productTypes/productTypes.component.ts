import { Component, AfterViewInit, ViewChild, Renderer2, ElementRef, EventEmitter } from '@angular/core';
import { ProductTypeService } from 'src/app/services/productType.service';
import { ToasterComponent } from 'src/app/common/components/toaster/toaster.component';
import { LoaderComponent } from 'src/app/common/components/loader/loader.component';
import { ProductType } from 'src/app/models/productType';
import { of } from 'rxjs';
import { NestedTreeControl } from '@angular/cdk/tree';
import {  MatTreeNestedDataSource, MatDialog } from '@angular/material';
import { ResponseStatus } from 'src/app/common/models/responseBase';
import { ModalBaseComponent } from 'src/app/common/components/modalBase/modalBase.component';
import { ModalBase } from 'src/app/common/models/modalBase';
import { ConfirmationModalComponent } from 'src/app/modals/confirmationModal/confirmationModal.component';

@Component({
  selector: 'app-product-types',
  templateUrl: './productTypes.component.html',
  styleUrls: ['./productTypes.component.css']
})
export class ProductTypesComponent implements AfterViewInit {

  constructor(private productTypeService: ProductTypeService, private renderer: Renderer2, private dialog: MatDialog) {
  }
  @ViewChild('toaster', { static: false }) toaster: ToasterComponent;
  @ViewChild('loader', { static: false }) loader: LoaderComponent;
  @ViewChild('treeNode', { static: false }) treeNode: ElementRef;
  loaderEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();
  confirmationModal = new ModalBaseComponent(this.dialog);
  treeControl = new NestedTreeControl((node: ProductType) => this.GetChildren(node));
  datasource = new MatTreeNestedDataSource<ProductType>();
  GetChildren = (node: ProductType) => of(node.children);

  hasChild(_: number, node: ProductType) {
    return node.children && node.children.length > 0;
  }

  ngAfterViewInit() {
    this.loader.show();
    this.productTypeService.selectAll().then(res => {
      this.loader.hide();
      if (res.status === ResponseStatus.Error) {
        this.toaster.openSnackBar('Error', ResponseStatus.Error);
        return;
      }
      this.datasource.data = res.data;
    }).catch(err => {
      this.loader.hide();
      this.toaster.openSnackBar('Error', ResponseStatus.Error);
    });
  }

  addNewItem(node: ProductType = null) {
    const newProductTypes = this.datasource.data;
    this.datasource.data = null;
    if (node) {
      node.children.push(new ProductType(node.productTypeId, true));
      this.treeControl.expand(node);
    } else {
      newProductTypes.push(new ProductType(0, true));
    }
    this.datasource.data = newProductTypes;
  }

  onInputChange(node: ProductType) {
    node.touched = true;
  }

  saveChanges() {
    this.confirmationModal.openDialog(
      new ModalBase('confirm_save_changes_title', 'confirm_save_changes_title', null, this.loaderEmitter, () => {
        this.loaderEmitter.emit(true);
        this.productTypeService.saveChanges(this.datasource.data).then(res => {
          this.loaderEmitter.emit(false);
          this.confirmationModal.closeDialog();
          if (res.status === ResponseStatus.Error) {
            res.messages.forEach(message => this.toaster.openSnackBar(message.value, ResponseStatus.Error));
            return;
          }
          this.datasource.data = res.data;
          this.toaster.openSnackBar('Success', ResponseStatus.Success);
        }).catch(err => {
          this.loaderEmitter.emit(false);
          this.confirmationModal.closeDialog();
          this.toaster.openSnackBar('Error', ResponseStatus.Error);
        });
      }), ConfirmationModalComponent);
  }
  onCheckboxChange(node: ProductType) {
    node.touched = true;
    node.active = !node.active.toString().toBoolean();
  }
  deleteNode(node: ProductType, nodeRef: any) {
    const descendants = nodeRef.querySelectorAll('.fadable');
    if (descendants[0].classList.contains('faded')) {
      this.toggleFadeOnDescendants([node]);
      descendants.forEach(d => {
        this.renderer.removeClass(d, 'faded');
      });
    } else {
      this.toggleFadeOnDescendants([node]);
      descendants.forEach(d => {
        this.renderer.addClass(d, 'faded');
      });
    }
  }

  toggleFadeOnDescendants(nodes: Array<ProductType>) {
    nodes.forEach(c => {
      c.toBeDeleted = !c.toBeDeleted;
      this.toggleFadeOnDescendants(c.children);
    });
  }
}

