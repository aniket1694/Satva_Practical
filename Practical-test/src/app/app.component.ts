import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray  } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Practical-test';
  formdata:any = FormGroup;
  submitted = false;
  inputItemA:any;
  inputItemB:any;
  inputItemC:any;
  inputItemD:any;
  myCheckbox1: boolean = false;
  myCheckbox2: boolean = false;
  myCheckbox3: boolean = false;
  myCheckbox4: boolean = false;

allOrdervalue:number = 0;
allOrderDiscountvalue:number = 0;
totalAmount:number = 0;
totalItemAValue: number =0;
totalItemBValue: number =0;
totalItemCValue: number =0;
totalItemDValue : number =0;
discount1: number =0;
discount2: number =0;
discount3: number =0;
discount4: number =0;
delivery: number =0;
totalDiscount: number =0;
discountAvailable : boolean = false;

 weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  d = new Date();
  day = this.weekday[this.d.getDay()];

calculateOrderValue(){
  if(this.myCheckbox1){
    this.totalItemAValue = this.inputItemA * 100
  }
  if(this.myCheckbox2){
    this.totalItemBValue = this.inputItemB * 200
  }
  if(this.myCheckbox3){
    this.totalItemCValue = this.inputItemC * 500
  }
  if(this.myCheckbox4){
    this.totalItemDValue = this.inputItemD * 300
  }
}
calculateTotalOrderValue(){
  this.allOrdervalue=  this.totalItemAValue+ this.totalItemBValue + this.totalItemCValue + this.totalItemDValue;
}

calculateDiscountedValue(){
  if(this.day == "Wednesday" || this.day == "Thursday"){
    this.discountAvailable = true;
    if ( this.allOrdervalue >= 5000){
      this.discount1 = 500;
      this.allOrderDiscountvalue = this.allOrdervalue - this.discount1;
    }
    else if ( this.allOrdervalue >= 4500 && this.allOrdervalue < 5000){
      this.discount2 = (this.allOrdervalue * 10)/100;
      this.allOrderDiscountvalue = this.allOrdervalue - this.discount2;
    }
    else if ( this.allOrdervalue >= 2000 && this.allOrdervalue < 4500){
      this.discount3 = (this.allOrdervalue * 8)/100;
      this.allOrderDiscountvalue = this.allOrdervalue - this.discount3;
    }
    else if ( this.allOrdervalue >= 1500 && this.allOrdervalue < 2000){
      this.discount4 = 50;
      this.allOrderDiscountvalue = this.allOrdervalue - this.discount4;
    }
    else{
      this.allOrderDiscountvalue = this.allOrdervalue
    }
    this.totalDiscount = this.discount1+this.discount2+this.discount3+this.discount4;
  }
  else{
    this.allOrderDiscountvalue = this.allOrdervalue
  }

}

calculateDeliveryCharge(){
if (this.allOrderDiscountvalue <= 1000){
  this.delivery = 80;
this.totalAmount = this.allOrderDiscountvalue + this.delivery;
}
else if (this.allOrderDiscountvalue > 1000 && this.allOrderDiscountvalue < 3000){
  this.delivery = 50;
  this.totalAmount = this.allOrderDiscountvalue + this.delivery;
  }
else{
    this.totalAmount = this.allOrderDiscountvalue;
    }
}
  constructor(
    private formBuilder: FormBuilder,
) {
    // redirect to home if already logged in

}

onSubmit(data:any) {
  this.inputItemA = data.inputItemA;
  this.inputItemB = data.inputItemB;
  this.inputItemC = data.inputItemC;
  this.inputItemD = data.inputItemD;
  this.myCheckbox1 = data.myCheckbox1;
  this.myCheckbox2 = data.myCheckbox2;
  this.myCheckbox3 = data.myCheckbox3;
  this.myCheckbox4 = data.myCheckbox4;
  this.calculateOrderValue();
  this.calculateTotalOrderValue();
  this.calculateDiscountedValue();
  this.calculateDeliveryCharge();
}
  ngOnInit() {
    this.formdata = new FormGroup({
      inputItemA: new FormControl(),
      inputItemB: new FormControl(),
      inputItemC: new FormControl(),
      inputItemD: new FormControl(),
      myCheckbox1: new FormControl(false),
      myCheckbox2: new FormControl(false),
      myCheckbox3: new FormControl(false),
      myCheckbox4: new FormControl(false)
   });
}
}
