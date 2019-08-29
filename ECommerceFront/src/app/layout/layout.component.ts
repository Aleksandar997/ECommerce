import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { User } from '../models/user';
import { LocalData } from '../common/helpers/localData';
import { Menu } from '../models/menu';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  animations: [
    trigger('indicatorRotate', [
      state('collapsed', style({ transform: 'rotate(0deg)' })),
      state('expanded', style({ transform: 'rotate(180deg)' })),
      transition('expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4,0.0,0.2,1)')
      ),
    ])
  ]
})
export class LayoutComponent implements OnInit {

  menus: Array<Menu>;
  constructor() {
    const user = LocalData.getUser();
    this.menus = JSON.parse(user, null)[0].menu;
  }

  ngOnInit() {
  }

}
