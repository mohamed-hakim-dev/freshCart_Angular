import { CommonModule } from '@angular/common';
import { Component, Renderer2 } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CutTextPipe } from '../../pipes/cut-text.pipe';
import { SearchPipe } from '../../pipes/search.pipe';
import { CartService } from '../../services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../services/wishlist.service';
import { HomeService } from '../../services/home.service';

@Component({
  selector: 'app-product',
  imports: [RouterLink,CommonModule,CutTextPipe,SearchPipe],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
    constructor(private _CartService:CartService,private _ToastrService:ToastrService,private _WishlistService:WishlistService,private _Renderer2:Renderer2,private homeService:HomeService){}
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
    // searching
    search():string
    {
      return this.homeService.searchTerm;
    }
    products:any[]=[];
    newData:any;
    ngOnInit(): void {
      this.homeService.getHomeData().subscribe({
        next:({data})=>{
          this.products=data;
        },
        error:(err)=>{
          console.log(err);
        }
      })
  

  
      this._WishlistService.loggedWish().subscribe({
        next:(res)=>{
          this.newData= res.data.map((item:any)=>item._id)
          this.wishData=this.newData;
          this._WishlistService.wishItems.next(res.data.length);
        }
      })
  
  
    }
  
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

}
