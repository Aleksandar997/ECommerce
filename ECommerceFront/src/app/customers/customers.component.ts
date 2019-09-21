import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { TableCheckbox } from '../common/helpers/tableCheckbox';
import { Customer } from '../models/customer';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { CustomerService } from '../services/customer.service';
import { LoaderComponent } from '../common/components/loader/loader.component';
import { ToasterComponent } from '../common/components/toaster/toaster.component';
import { ResponseStatus } from '../common/models/responseBase';
import { BasePaging } from '../models/paging/basePaging';
import { state, trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class CustomersComponent implements OnInit, AfterViewInit {

  @ViewChild('paginator', { static: true }) paginator: MatPaginator;
  @ViewChild('loader', {static: false}) loader: LoaderComponent;
  @ViewChild('toaster', { static: false }) toaster: ToasterComponent;
  paging: BasePaging;
  displayedColumns: string[] = [
    'firstName', 'lastName', 'userName', 'address', 'floor', 'flat', 'contactNumber', 'select', 'accountInfo'
  ];
  dataSourceLength: number;
  tableCheckbox: TableCheckbox<Customer>;
  dataSource: MatTableDataSource<Customer>;
  constructor(private customerService: CustomerService) { }

  ngOnInit() {
    this.paging = new BasePaging();
    this.dataSource = new MatTableDataSource<Customer>();
    this.tableCheckbox = new TableCheckbox(
      new SelectionModel<Customer>(), this.dataSource.data, 'selectedCustomers', 'customerId');
  }

  ngAfterViewInit() {
    this.getCustomers();
  }
  getCustomers() {
    this.loader.show();
    this.customerService.selectAll().then(res => {
      console.log(res);
      this.dataSourceLength = res.count;
      this.dataSource = new MatTableDataSource<Customer>(res.data);
      this.tableCheckbox.setData(res.data);
      this.loader.hide();
    }).catch(err => {
      console.log(err);
      this.loader.hide();
      this.toaster.openSnackBar('Error', ResponseStatus.Error);
    });
  }

}
