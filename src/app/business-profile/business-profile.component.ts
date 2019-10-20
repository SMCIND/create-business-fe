import { Component, OnInit ,ElementRef, NgZone, OnDestroy} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Business,BusinessType,BusinessPasswordChange,mapBusinessTypes } from '../business';
import { HttpClientService } from '../service/http-client.service';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { AlertService} from '../service/alert.service';

@Component({
  selector: 'app-business-profile',
  templateUrl: './business-profile.component.html',
  styleUrls: ['./business-profile.component.css']
})
export class BusinessProfileComponent implements OnInit,OnDestroy {

  businesstypes=BusinessType;
  phoneNumberCounter=1;
  addressCounter=1;
  replicateAddressCheckbox=true;
  phonenumber1=false;
  phonenumber2=false;
  officeAddress1=false;
  sameAddress=false;
  submitted = false;
  addresstypevalue = 'OFFICE';
  phonetypevalue = 'OFFICE';
  serviceproviderslist=[];

  currentBusiness: Business;
  currentBusinessSubscription: Subscription;
  model: Business;

  b_type_keys() : Array<string> {
    var keys = Object.keys(this.businesstypes);
    return keys.slice(keys.length / 2);
  }

  constructor(
    public router: Router,
    public activatedroute: ActivatedRoute,
    public elementRef:ElementRef,
    public httpClientService: HttpClientService,
    private ngZone: NgZone,
    private alertService: AlertService
    ) {
      this.currentBusinessSubscription = this.httpClientService.currentBusiness.subscribe(user => {
        this.currentBusiness = user;
      });
     }

  ngOnInit() {
    this.model = this.currentBusiness;
    let val= this.model.businessType;
    console.log(val);
    this.serviceproviderslist = mapBusinessTypes(val);
    console.log(this.serviceproviderslist);
  }
  ngOnDestroy() {
    this.currentBusinessSubscription.unsubscribe();
  }  
  
  onPhoneTypeChange(event){
    if(event.target.value=='HOME'){
      this.phonetypevalue = 'HOME';
    }
    else if(event.target.value=='OFFICE'){
      this.phonetypevalue = 'OFFICE';
    }
    else if(event.target.value=='MOBILE'){
      this.phonetypevalue = 'MOBILE';
    }
  }
  onAddressTypeChange(event){
    if(event.target.value=='HOME'){
      this.addresstypevalue = 'HOME';
    }
    else if(event.target.value=='OFFICE'){
      this.addresstypevalue = 'OFFICE';
    }
  }
  
  // new Business(null,null,null,null,null,null,null,null,null,null,"OFFICE",null,null,null,null,null,null,"HOME",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);
  
  model1 = new BusinessPasswordChange(null,null,null);
  passwordsubmitted = false;
  onChangePasswordForm() { this.passwordsubmitted = true; }

  editformsubmitted = false;
  onEditForm() { this.editformsubmitted = true; }

  updateBusiness(userdata){ 
    this.httpClientService.UpdateBusiness(userdata).subscribe(
      res => {
      this.alertService.success('Business details updated successful.', true);
      this.ngZone.run(() => this.router.navigateByUrl('/business'))
    },
    error => {
      this.alertService.error('Username already exists.');
    }
    );
  }
  filterServices(event){
    let val= event.target.value;
    this.serviceproviderslist = mapBusinessTypes(val);
    
  }
  doUpperCase(){
    if(this.model.primaryCountry != null)
      this.model.primaryCountry = this.model.primaryCountry.toUpperCase();
    if(this.model.primaryState != null)
      this.model.primaryState = this.model.primaryState.toUpperCase();
    if(this.model.primaryCity != null)
      this.model.primaryCity = this.model.primaryCity.toUpperCase();
    if(this.model.secondaryCountry != null)
      this.model.secondaryCountry = this.model.secondaryCountry.toUpperCase();
    if(this.model.secondaryState != null)
      this.model.secondaryState = this.model.secondaryState.toUpperCase();
    if(this.model.secondaryCity != null)
      this.model.secondaryCity = this.model.secondaryCity.toUpperCase();
  }
}
