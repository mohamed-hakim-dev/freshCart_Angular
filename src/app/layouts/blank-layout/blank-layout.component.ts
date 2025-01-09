import { Component, ElementRef, HostListener, Renderer2, ViewChild } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { BlankNavComponent } from '../../components/blank-nav/blank-nav.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { WishlistService } from '../../services/wishlist.service';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-blank-layout',
  imports: [RouterOutlet,BlankNavComponent,FooterComponent,RouterLink,CommonModule],
  templateUrl: './blank-layout.component.html',
  styleUrls: ['./blank-layout.component.scss']
})
export class BlankLayoutComponent {
  constructor(private _Renderer2:Renderer2,private _WishlistService:WishlistService){}
  // wishlist heart icon
  num:number=0;
  ngOnInit() {
    this._WishlistService.wishItems.subscribe({
      next:(numOFWishes)=>{
        this.num=numOFWishes;
      }
    })
  }


  // to up ball
  toUp():void{
    window.scrollTo(0,0);
  }
  @ViewChild(`ToUpRef`) toUpRef!:ElementRef;
  @HostListener('window:scroll')
  onScroll():void{
    if(window.scrollY>600){
      this._Renderer2.removeClass(this.toUpRef.nativeElement,'hidden');
    }else{
      this._Renderer2.addClass(this.toUpRef.nativeElement,'hidden');
    }
  }

  // ngOnInit(): void {
  //   // this._Renderer2.setStyle(document.body, 'background-color', '#f8f9fac7');
  // }


  }