import { CutTextPipe } from './../../pipes/cut-text.pipe';
import { RouterLink } from '@angular/router';
import { WishlistService } from './../../services/wishlist.service';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-wishlist',
  imports: [RouterLink,CommonModule,CutTextPipe],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit {
    constructor(private _CartService:CartService,private _ToastrService:ToastrService,private _WishlistService:WishlistService,private _Renderer2:Renderer2){}
    catData:any[]=[];
    wishData:string[]=[];
  // wishlist
  // adding
  addWish(ID:string):void
  {
    this._WishlistService.addTOWIsh(ID).subscribe({
      next:(res)=>{
        if(res.status=='success')
        {
          this._ToastrService.success(res.message);
          this.wishData=res.data;
          this._WishlistService.wishItems.next(res.data.length);
        }
      }
    })
  }
  // removing
  removeWish(ID:string):void
  {
    this._WishlistService.removeFromWish(ID).subscribe({
      next:(res)=>{
        this._ToastrService.success(res.message)
        this.wishData=res.data;
        this._WishlistService.wishItems.next(res.data.length);
  
      }
    })
  }

    products:any[]=[];
    newData:any;
    toCart(prodID:string):void
    {
      this._CartService.toCart(prodID).subscribe({
        next:({message,numOfCartItems,data})=>{
          this._ToastrService.success(message)
          console.log(message);
          console.log(data);
          this._CartService.cartItem.next(numOfCartItems);
        }
      })
    }
  wishlistData:any[]=[];
  ngOnInit(): void {
    this._WishlistService.loggedWish().subscribe({
      next:(res)=>{
        if(res.status===`success`)
        {
          this.wishlistData=res.data;
          this.newData= res.data.map((item:any)=>item._id)
          this.wishData=this.newData;
        }
      }
    })
  }
}
