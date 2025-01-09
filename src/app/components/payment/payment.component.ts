import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators ,ReactiveFormsModule, NgModel} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PaymentService } from '../../services/payment.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-payment',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent implements OnInit{
  constructor(private _ActivatedRoute:ActivatedRoute, private _PaymentService:PaymentService,private _ToastrService:ToastrService){};
  cartID:any='';
  ngOnInit(): void {
    // get ID from pathUrl::
    this._ActivatedRoute.paramMap.subscribe({
      next:(param)=>{
      this.cartID=param.get(`id`);
      }
    })
  }
  paymentForm:FormGroup=new FormGroup({
    details:new FormControl(''),
    phone:new FormControl('',[Validators.required]),
    city:new FormControl('',[Validators.required]),
  })

  cashOrder():void
  {
    this._PaymentService.cashOrder(this.cartID,this.paymentForm.value).subscribe({
      next:(res)=>{
        this._ToastrService.success(`Your order is making done\nThank's ${this.paymentForm.get(`details`)?.value} ❤️`);
        console.log(res);
      },
      error:(err)=>{
        this._ToastrService.error(err.error.message)
      }
    })
  }


  onlinePayment():void
  {
    this._PaymentService.onlinePay(this.cartID,this.paymentForm.value).subscribe({
      next:(res)=>{
        if(res.status===`success`)
        {
          window.open(res.session.url)

        }
      }
    })
  }
}