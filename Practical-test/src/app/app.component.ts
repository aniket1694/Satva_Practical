import { OrderDetails } from './model/orderDetails';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray  } from '@angular/forms';
import { SharedService } from './services/shared.service';

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

allOrderDiscountvalue:number = 0;

discount1: number =0;
discount2: number =0;
discount3: number =0;
discount4: number =0;
discountAvailable : boolean = false;

orderDetails = new OrderDetails();
 weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  d = new Date();
  day = this.weekday[this.d.getDay()];
  constructor(private  service: SharedService) {

}
calculateOrderValue(){
  if(this.myCheckbox1){
    this.orderDetails.ItemA = this.inputItemA * 100
  }
  if(this.myCheckbox2){
    this.orderDetails.ItemB = this.inputItemB * 200
  }
  if(this.myCheckbox3){
    this.orderDetails.ItemC = this.inputItemC * 500
  }
  if(this.myCheckbox4){
    this.orderDetails.ItemD = this.inputItemD * 300
  }
}
calculateTotalOrderValue(){
  this.orderDetails.SubTotal=  this.orderDetails.ItemA+ this.orderDetails.ItemB + this.orderDetails.ItemC + this.orderDetails.ItemD;
}

calculateDiscountedValue(){
  if(this.day == "Wednesday" || this.day == "Thursday"){
    this.discountAvailable = true;
    if ( this.orderDetails.SubTotal >= 5000){
      this.discount1 = 500;
      this.allOrderDiscountvalue = this.orderDetails.SubTotal - this.discount1;
    }
    else if ( this.orderDetails.SubTotal >= 4500 && this.orderDetails.SubTotal < 5000){
      this.discount2 = (this.orderDetails.SubTotal * 10)/100;
      this.allOrderDiscountvalue = this.orderDetails.SubTotal - this.discount2;
    }
    else if ( this.orderDetails.SubTotal >= 2000 && this.orderDetails.SubTotal < 4500){
      this.discount3 = (this.orderDetails.SubTotal * 8)/100;
      this.allOrderDiscountvalue = this.orderDetails.SubTotal - this.discount3;
    }
    else if ( this.orderDetails.SubTotal >= 1500 && this.orderDetails.SubTotal < 2000){
      this.discount4 = 50;
      this.allOrderDiscountvalue = this.orderDetails.SubTotal - this.discount4;
    }
    else{
      this.allOrderDiscountvalue = this.orderDetails.SubTotal
    }
    this.orderDetails.Discount = this.discount1+this.discount2+this.discount3+this.discount4;
  }
  else{
    this.allOrderDiscountvalue = this.orderDetails.SubTotal
  }

}

calculateDeliveryCharge(){
if (this.allOrderDiscountvalue <= 1000){
  this.orderDetails.DeliveryCharge = 80;
  this.orderDetails.TotalAmount = this.allOrderDiscountvalue + this.orderDetails.DeliveryCharge;
}
else if (this.allOrderDiscountvalue > 1000 && this.allOrderDiscountvalue < 3000){
  this.orderDetails.DeliveryCharge = 50;
  this.orderDetails.TotalAmount = this.allOrderDiscountvalue + this.orderDetails.DeliveryCharge;
  }
else{
    this.orderDetails.TotalAmount = this.allOrderDiscountvalue;
    }
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
  this.service.saveOrderDetails(this.orderDetails).subscribe((orderDetails) => {});
  console.log("data has gone");
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
