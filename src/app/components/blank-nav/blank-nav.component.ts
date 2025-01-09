import { CommonModule } from '@angular/common';
import { CartService } from './../../services/cart.service';
import { HomeService } from './../../services/home.service';
import { Component, ElementRef, HostListener, OnInit, Renderer2,ViewChild } from '@angular/core';
import { FormsModule, } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
@Component({
  selector: 'app-blank-nav',
  imports: [RouterLink,RouterLinkActive,FormsModule,CommonModule],
  templateUrl: './blank-nav.component.html',
  styleUrl: './blank-nav.component.scss'
})
export class BlankNavComponent implements OnInit {
  constructor(private _Renderer2:Renderer2,private _HomeService:HomeService ,private _CartService:CartService){}
  num:number=0;
  ngOnInit(): void {
    this._CartService.cartItem.subscribe({
      next:(numberOfCartItem)=>{
        this.num=numberOfCartItem;
      }
    })
    this._CartService.loggedCart().subscribe({
      next:({numberOfCartItem})=>{
        this.num=numberOfCartItem;
      }
    })
  }
  // logOut
  singOut():void{
    localStorage.removeItem('_token');
  }
  // searchTerm
  term: string = '';


  search(): void {
    this._HomeService.searchTerm = this.term;
  }



@ViewChild('navbar') navEle!: ElementRef;
@ViewChild('sea') seaEle!: ElementRef;
@HostListener('window:scroll')
onScroll(): void {
  if (window.scrollY > 400) {
    this._Renderer2.addClass(this.seaEle.nativeElement, 'bg-slate-600');
    this._Renderer2.addClass(this.navEle.nativeElement, 'px-10');
    this._Renderer2.addClass(this.navEle.nativeElement, 'bg-green-50');
    this._Renderer2.addClass(this.navEle.nativeElement, 'opacity-90');
    this._Renderer2.addClass(this.navEle.nativeElement, 'rounded-3xl');
    this._Renderer2.addClass(this.navEle.nativeElement, 'scale-95');
    this._Renderer2.addClass(this.navEle.nativeElement, 'mt-2');
    this._Renderer2.addClass(this.navEle.nativeElement, 'shadow-2xl');
    this._Renderer2.addClass(this.seaEle.nativeElement, 'text-green-300');
  } else {
    this._Renderer2.removeClass(this.seaEle.nativeElement, 'text-green-300');
    this._Renderer2.removeClass(this.seaEle.nativeElement, 'bg-slate-600');
    this._Renderer2.removeClass(this.navEle.nativeElement, 'shadow-2xl');
    this._Renderer2.removeClass(this.navEle.nativeElement, 'mt-2');
    this._Renderer2.removeClass(this.navEle.nativeElement, 'scale-95');
    this._Renderer2.removeClass(this.navEle.nativeElement, 'rounded-3xl');
    this._Renderer2.removeClass(this.navEle.nativeElement, 'opacity-90');
    this._Renderer2.removeClass(this.navEle.nativeElement, 'bg-green-50');
    this._Renderer2.removeClass(this.navEle.nativeElement, 'px-10');
  }
}












  // @ViewChild('navbar') navElement!:ElementRef;
  // @HostListener('window:scroll')
  // onScroll():void
  // {
  //   this._Renderer2.addClass(this.navElement.nativeElement,'px-10')
  // }
}
