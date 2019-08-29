import { BrowserModule } from '@angular/platform-browser';
import { NgModule, forwardRef } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { LoginComponent } from './login/login.component';
import { ClockComponent } from './common/components/clock/clock.component';
import { HttpClientHelper } from './common/http/HttpClientHelper';
import { AuthenticationService } from './services/authentication.service';
import { TokenInterceptorService } from './common/interceptors/token-interceptor.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { HomeModule } from './home/home.module';
import { ToasterModule } from './common/components/toaster/toaster.module';
import { RouterModule } from '@angular/router';
import { BreadcrumbComponent } from './common/components/breadcrumb/breadcrumb.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductTypeService } from './services/productType.service';
import { LoaderModule } from './common/components/loader/loader.module';
import { ProductService } from './services/product.service';
import { FileService } from './services/file.service';

import './common/extensions/StringExtensions';
import './common/extensions/ArrayExtensions';
import { TranslatePipeModule } from './common/pipes/translate/translatePipe.module';
import { TranslatePipe } from './common/pipes/translate/translatePipe';
import { MatPaginatorIntlLocalized } from './common/adapters/matPaginatorIntlAdapter';
import { MatPaginatorIntl } from '@angular/material';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ClockComponent,
    LayoutComponent,
    BreadcrumbComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    HomeModule,
    ToasterModule,
    RouterModule,
    BrowserAnimationsModule,
    LoaderModule,
    TranslatePipeModule
  ],
  providers: [
    HttpClientHelper,
    AuthenticationService,
    ProductTypeService, ProductService,
    FileService,
    TranslatePipe,
    // DocumentService,
    {
      provide: MatPaginatorIntl,
      useClass: forwardRef(() => MatPaginatorIntlLocalized)
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    // {
    //   provide: RouteReuseStrategy,
    //   useClass: RouteReuseStrategyAdapter
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
