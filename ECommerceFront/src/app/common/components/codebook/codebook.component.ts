import { Component, OnInit, Input } from '@angular/core';
import { CodebookEntity } from '../../models/codebookEntity';
import { MatTableDataSource } from '@angular/material';
import { ICodebookServiceBase } from '../../models/interfaces/IcodebookServiceBase';

@Component({
  selector: 'codebook',
  templateUrl: './codebook.component.html',
  styleUrls: ['./codebook.component.css']
})
export class CodebookComponent implements OnInit {

  dataSource: MatTableDataSource<CodebookEntity>;

  // @Input('codebookEntity')
  // set codebookEntity(value: Array<CodebookEntity>) {
  //   this.dataSource.data = value;
  // }

  onInit(codebookService: ICodebookServiceBase<any>) {
    codebookService.selectAll().then(res => {
      console.log(res);
    });
  }

  constructor() { }

  ngOnInit() {
  }

}
