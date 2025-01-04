import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DetailsService } from '../../services/details.service';
import { CartService } from '../../services/cart.service';
@Component({
  selector: 'app-details',
  imports: [CommonModule,RouterLink],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {
  prodID:any='';
  details:any;
  isFadingOut: boolean = false;
  selectedImage: string | null = null;
  constructor(private _DetailsService:DetailsService,private _ActivatedRoute:ActivatedRoute,private _CartService:CartService,private _ToastrService:ToastrService){}
  changeImage(newImage: string) {
        this.details.imageCover = newImage; 
        this.selectedImage=newImage;

}
  ngOnInit(): void {
    // get the id from the url when the component is loaded
    this._ActivatedRoute.paramMap.subscribe({
      next:(params)=>{
        // console.log(params.get('id'));
        this.prodID=params.get('id');
      }
    })
    this._DetailsService.getDetails(this.prodID||'').subscribe({
      next:(data)=>{
        this.details=data.data;
        // console.log(data.data);
      }
    })
  }
  toCart()
  {
    this._CartService.toCart(this.prodID).subscribe({
      next:(res)=>{
        if(res.status=='success')
        {
          // console.log(res);
          this._ToastrService.success(res.message);
        }
      },error:(err)=>{
        if(err.error.status=='fail')
        {
          // console.log(err.error);
          this._ToastrService.error(err.error.message);     
      }
    }
    })
  }
}