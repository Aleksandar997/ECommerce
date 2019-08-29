import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, Observable, Subscription } from 'rxjs';
import { DocumentService } from 'src/app/services/document.service';

@Component({
  selector: 'document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent implements OnInit, OnDestroy {

  documentType: string;
  routeSub: Subscription;
  constructor(private activatedRoute: ActivatedRoute, private documentService: DocumentService) {
    this.routeSub = this.activatedRoute.params.subscribe(param => {
      if (param.type) {
        this.documentType = param.type;
        this.activatedRoute.snapshot.data.title = this.documentType + this.activatedRoute.snapshot.data.title;
      }
    });
  }

  ngOnInit() {
    this.documentService.selectAll().then(res => {
      console.log(res);
    });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

}
