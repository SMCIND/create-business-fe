import { Component, OnInit ,ElementRef, NgZone} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Business,BusinessType,BusinessPasswordChange } from '../../business';
import { HttpClientService } from '../../service/http-client.service';


@Component({
  selector: 'app-business-register',
  templateUrl: './business-register.component.html',
  styleUrls: ['./business-register.component.css']
})
export class BusinessRegisterComponent implements OnInit {
  htmlToAddPhoneNumber='';
  businesstypes=BusinessType;
  phoneNumberCounter=1;
  addressCounter=1;
  replicateAddressCheckbox=true;
  phonenumber1=false;
  phonenumber2=false;
  officeAddress1=false;
  sameAddress=false;
  submitted = false;
  addresstypevalue = 'HOME';
  phonetypevalue = 'HOME';

  b_type_keys() : Array<string> {
    var keys = Object.keys(this.businesstypes);
    return keys;
  }
  b_type_values(): Array<string> {
    var values = Object.values(this.businesstypes);
    return values;
  }

  constructor(
    public router: Router,
    public activatedroute: ActivatedRoute,
    public elementRef:ElementRef,
    public httpClientService: HttpClientService,
    private ngZone: NgZone
    ) { }

  ngOnInit() {
  }

  addAnotherPhoneNumber(){
    if(this.phoneNumberCounter==1 || this.phoneNumberCounter==3){
      this.phoneNumberCounter+=1;
      this.phonenumber1=true;
    }
    else if(this.phoneNumberCounter==2){
      this.phoneNumberCounter+=2;
      this.phonenumber2=true;
    }
  }
  removePhoneNumber1(){
    this.phoneNumberCounter-=1;
    this.phonenumber1=false;
  }
  removePhoneNumber2(){
    this.phoneNumberCounter-=2;
    this.phonenumber2=false;
  }

  addAnotherAddress(){
    if(this.addressCounter==1){
      this.addressCounter+=1;
      this.replicateAddressCheckbox=false;  
      this.officeAddress1=true;
      document.getElementById('another_address').setAttribute('hidden','hidden');
      document.getElementById('city_field1').classList.remove('col-sm-5');
      document.getElementById('city_field1').classList.add('col-sm-6');
    }
  }
  removeAddress(){
    this.replicateAddressCheckbox=true;
    this.addressCounter -= 1;
    this.officeAddress1 = false;
    document.getElementById('another_address').removeAttribute('hidden',);
    document.getElementById('city_field1').classList.add('col-sm-5');
    document.getElementById('city_field1').classList.remove('col-sm-6');
  }
  onChangeCheckbox(event,addressline1:string,addressline2:string,landmark:string,pincode:number,country:string,state:string,city:string){
    if(event.target.checked){
      this.sameAddress=true;
      // this.model.addressLine21=addressline1;
      // this.model.addressLine22=addressline2;
      // this.model.landmark2=landmark;
      // this.model.country2=country;
      // this.model.state2=state;
      // this.model.city2=city;
      // this.model.pincode2=pincode;
      // document.getElementById('city_field1').classList.remove('col-sm-5');
      document.getElementById('city_field1').classList.add('col-sm-6');
      // if(this.model.addressType=="HOME") this.model.addressType2="OFFICE";
      // if(this.model.addressType=="OFFICE") this.model.addressType2="HOME";
    }
    else{
      this.sameAddress=false;
      // this.model.addressLine21=null;
      // this.model.addressLine22=null;
      // this.model.landmark2=null;
      // this.model.country2=null;
      // this.model.state2=null;
      // this.model.city2=null;
      // this.model.pincode2=null;
      document.getElementById('city_field1').classList.add('col-sm-5');
      document.getElementById('city_field1').classList.remove('col-sm-6');
      
    }
  }
  onAddressTypeChange(event){
    // this.model.addressType=event.target.value;
    // let address_matches1 = document.getElementsByClassName('address-1');
    //   for (let i=0; i<address_matches1.length; i++) {
    //     address_matches1[i].removeAttribute('readonly');
    //   }
    // if(this.model.addressType=='HOME'){
    //   this.model.addressType2='OFFICE';
    //   let address_matches2 = document.getElementsByClassName('address-2');
    //   for (let i=0; i<address_matches2.length; i++) {
    //     address_matches2[i].removeAttribute('readonly');
    //   }
    //   this.addresstypevalue = 'HOME';
    // }
    // else if(this.model.addressType=='OFFICE'){
    //   this.model.addressType2='HOME';
    //   let address_matches2 = document.getElementsByClassName('address-2');
    //   for (let i=0; i<address_matches2.length; i++) {
    //     address_matches2[i].removeAttribute('readonly');
    //   }
    //   this.addresstypevalue = 'OFFICE';
    // }
  }
  onAddressTypeChange1(event){
    // this.model.addressType2=event.target.value;
    // let address_matches2 = document.getElementsByClassName('address-2');
    //   for (let i=0; i<address_matches2.length; i++) {
    //     address_matches2[i].removeAttribute('readonly');
    //   }
    //   if(this.model.addressType2=='HOME'){
    //     this.model.addressType='OFFICE';
    //     let address_matches2 = document.getElementsByClassName('address-2');
    //     for (let i=0; i<address_matches2.length; i++) {
    //       address_matches2[i].removeAttribute('readonly');
    //     }
    //   }
    //   else if(this.model.addressType2=='OFFICE'){
    //     this.model.addressType='HOME';
    //     let address_matches2 = document.getElementsByClassName('address-2');
    //     for (let i=0; i<address_matches2.length; i++) {
    //       address_matches2[i].removeAttribute('readonly');
    //     }
    //   }
  }
    
  model = new Business(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);
  
  onSubmit() { this.submitted = true; }
  
  // TODO: Remove after api integration
  business_name = "Ferns n Petals"
  business_type = "Wedding Event Florists"
  business_url = "www.fernsnpetals.com"
  business_address = {
    OFFICE:{
    business_addressline1 : "3/12, Akshok Avenue",
    business_addressline2 : "Marks Road",
    business_landmark : "Near ABC Palace",
    business_country : "India",
    business_state : "Hyderabad",
    business_city : "Telangana",
    business_pincode : "111111"
  },
  HOME:{
    business_addressline1 : "3/12, GKS Avenue",
    business_addressline2 : "Markx Road",
    business_landmark : "Near XYZ Palace",
    business_country : "India",
    business_state : "Hyderabad",
    business_city : "Telangana",
    business_pincode : "111112"
  }
};
  
  business_description = "";
  business_phone_number = {HOME:9090909090,OFFICE:8080808080,MOBILE:''}
  services_provided = "Flower Decoration, Flower Gifts, Flower Vases, Flower Supplies, Bouquets";

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

  model1 = new BusinessPasswordChange(null,null,null);
  passwordsubmitted = false;
  onChangePasswordForm() { this.passwordsubmitted = true; }

  editformsubmitted = false;
  onEditForm() { this.editformsubmitted = true; }

  createBusiness(userdata){ 
    this.httpClientService.CreateBusiness(userdata).subscribe(res => {
      alert("Business created successfully.")
      this.ngZone.run(() => this.router.navigateByUrl('/business'))
    });
  }
}