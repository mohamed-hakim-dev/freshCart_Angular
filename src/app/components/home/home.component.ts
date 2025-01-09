import { CategoriesService } from './../../services/categories.service';
import { Component, OnInit, AfterViewInit, Renderer2  } from '@angular/core';
import { HomeService } from '../../services/home.service';
import { CommonModule } from '@angular/common';
import { CutTextPipe } from '../../pipes/cut-text.pipe';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { SearchPipe } from '../../pipes/search.pipe';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { WishlistService } from '../../services/wishlist.service';



@Component({
  selector: 'app-home',
  imports: [CommonModule,CutTextPipe,RouterLink,SearchPipe,CarouselModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  constructor(private homeService:HomeService,private _CartService:CartService,private _ToastrService:ToastrService,private _CategoriesService:CategoriesService,private _WishlistService:WishlistService,private _Renderer2:Renderer2){}
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

    this._CategoriesService.getAllCategories().subscribe({
      next:({data})=>{
        this.catData=data;
        console.log(this.catData);
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


// owl carousel options
  customOptions: OwlOptions = {

    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    autoplay: true,
    autoHeight: true,
    smartSpeed: 1000,
    dots: false,
    items:2,
    navSpeed: 500,
    autoplayHoverPause: false,
    navText: ['', ''],
    responsive: {
      0: {
        items: 2
      },
      400: {
        items: 2
      },
      740: {
        items: 2
      },
      940: {
        items: 2
      }
    },
    nav: false
  }
// looping options
customOptions2: OwlOptions = {

  loop: true,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: true,
  autoplay: true,
  autoHeight: true,
  smartSpeed: 500,
  animateIn: 'fadeIn',
  animateOut: 'fadeOut',
  center: true,
  mergeFit: true,
  responsiveRefreshRate: 10,
  autoplaySpeed: 1000,
  autoplayTimeout: 2000,
  dots: false,
  items:2,
  autoplayHoverPause: false,
  navText: ['', ''],
  responsive: {
    0: {
      items: 2
    },
    400: {
      items: 3
    },
    740: {
      items: 6
    },
    940: {
      items: 6
    }
  },
  nav: false
}
}