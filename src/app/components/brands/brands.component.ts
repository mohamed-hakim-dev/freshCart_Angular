import { Component, OnInit } from '@angular/core';
import { BrandsService } from '../../services/brands.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-brands',
  imports: [CommonModule],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit {
  constructor(private _BrandsService:BrandsService){}
  Brands:any[]=[]
  ngOnInit(): void {
    this._BrandsService.getAllBrands().subscribe({
      next:({data})=>{
        // console.log(data);
        this.Brands=data;
      }
    })
  }
}
