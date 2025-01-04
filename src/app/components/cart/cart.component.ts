import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [CommonModule,RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  constructor(private _CartService:CartService){}
  cartItems:number=0;
  totalPrice:number=0;
  products:any[]=[];
  ngOnInit(): void {
      this._CartService.loggedCart().subscribe({
        next:({numOfCartItems,data})=>{
          this.cartItems=numOfCartItems;
          this.totalPrice=data.totalCartPrice;
          this.products=data.products;
          console.log(data);
        }
      })
    }
    updateCount(cartID:string,updatedCount:number):void
    {
      console.log(updatedCount);
      this._CartService.updateQuantity(cartID,updatedCount).subscribe({
        next:({numOfCartItems,data})=>{
          this.cartItems=numOfCartItems;
          this.totalPrice=data.totalCartPrice;
          this.products=data.products;
        }
      })
    }
    removeItem(prodID:any):void
    {
      this._CartService.removeItem(prodID).subscribe({
        next:({numOfCartItems,data})=>{
          this.cartItems=numOfCartItems;
          this.totalPrice=data.totalCartPrice;
          this.products=data.products;
        }
      })
    }
    clearCart():void
    {
      this._CartService.clearCart().subscribe({
        next:(res)=>{
          if(res.message==='success')
          {
            this.cartItems = 0;
          }
        }
      })
    }
}