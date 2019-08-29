import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { MAT_STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css'],
  providers: [{
    provide: MAT_STEPPER_GLOBAL_OPTIONS, useValue: { displayDefaultIndicatorType: false }
  }]
})
export class BreadcrumbComponent implements OnInit {

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
  }

  breadcrumbs: Array<string>;
  ngOnInit() {
    this.listenRouting();
  }

  listenRouting() {
    this.mapBreadcrumb();
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd))
      .subscribe(route => {
        this.mapBreadcrumb();
      });
  }

  mapBreadcrumb() {
    // if (this.breadcrumb) {
    //   this.renderer.addClass(this.breadcrumb.nativeElement, 'hidden');
    // }
    this.breadcrumbs = new Array<string>();
    let currentRoute = this.activatedRoute.root;
    do {
      const childrenRoutes = currentRoute ? currentRoute.children : [];
      currentRoute = null;
      childrenRoutes.forEach(childRoute => {
        if (childRoute.outlet === 'primary') {
          const data: any = childRoute.snapshot.data;
          if (data.title) {
            this.setBreadcrumb(data.title);
          }
          currentRoute = childRoute;
        }
      });
      // if (currentRoute == null) {
      //   this.renderer.removeClass(this.breadcrumb.nativeElement, 'hidden');
      //   clearInterval(loop);
      // }
    } while (currentRoute);
  }

  setBreadcrumb(routerUrl: string) {
    if (routerUrl) {
      routerUrl.split(';').forEach(crumb => {
        if (!this.breadcrumbs.includes(crumb)) {
          this.breadcrumbs.push(crumb);
        }
      });
    }
  }
}
