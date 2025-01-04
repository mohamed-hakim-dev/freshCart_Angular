import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService } from '../../services/categories.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-specific-cat',
  imports: [CommonModule],
  templateUrl: './specific-cat.component.html',
  styleUrl: './specific-cat.component.scss'
})
export class SpecificCatComponent implements OnInit {
  constructor(private _ActivatedRoute:ActivatedRoute,private _CategoriesService:CategoriesService){}
  catID:any='';
  catData:any[]=[];
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:(params)=>{
        this.catID=params.get('id');
        console.log(this.catID);
      }
    })

    this._CategoriesService.getSpecificSubCategories(this.catID).subscribe({
      next:({data})=>{
        console.log(data);
      }
    })
  }
}
