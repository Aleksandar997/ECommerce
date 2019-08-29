import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { LoginInfo } from '../models/loginInfo';
import { LoaderComponent } from '../common/components/loader/loader.component';
import { ToasterComponent } from '../common/components/toaster/toaster.component';
import { ResponseStatus } from '../common/models/responseBase';
import { LocalizationService } from '../services/localization.service';
import { Culture } from '../common/models/culture';
import { LocalData } from '../common/helpers/localData';
import { MatSelect } from '@angular/material';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit {

  @ViewChild('toaster', { static: false }) toaster: ToasterComponent;
  @ViewChild('loader', { static: false }) loader: LoaderComponent;
  @ViewChild('dropdown', { static: false }) dropdown: MatSelect;
  loginInfo: LoginInfo;
  selectedCulture: Culture;
  cultures: Array<Culture>;
  constructor(private authenticationService: AuthenticationService, private router: Router,
              private localizationService: LocalizationService) {
    this.loginInfo = new LoginInfo();
    this.cultures = new Array<Culture>();
  }
  myForm: any;

  ngAfterViewInit() {
    this.loader.show();
    this.localizationService.getTranslates().then(res => {
      this.cultures = res.data;
      LocalData.setLoginLocalization(this.cultures);
      this.selectedCulture = this.cultures.firstElement();
      this.dropdown.value = this.selectedCulture.name;
      this.loader.hide();
    }).catch(err => {
      this.loader.hide();
      this.toaster.openSnackBar('Error', ResponseStatus.Error);
    });
  }

  login() {
    this.loader.show();
    this.loginInfo.cultureId = this.selectedCulture.cultureId;
    this.authenticationService.login(this.loginInfo).then(res => {
      LocalData.deleteLoginLocalization();
      LocalData.setLocalization(this.selectedCulture.localizationPair);
      this.navigateLogged();
      this.loader.hide();
    }).catch(err => {
      this.loader.hide();
      this.toaster.openSnackBar('Error', ResponseStatus.Error);
    });
  }

  navigateLogged() {
    this.router.navigate(['/home']);
  }

  onSelect(event) {
    this.selectedCulture = this.cultures.find(c => c.name === event.value);
  }

}
