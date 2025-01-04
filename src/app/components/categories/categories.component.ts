import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../services/categories.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-categories',
  imports: [CommonModule,RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {
  constructor(private _CategoriesService:CategoriesService){}
  categories:any[]= [];
  ngOnInit(): void {
    this._CategoriesService.getAllCategories().subscribe({
      next:({data}: {data: any})=>{
        this.categories=data;
        console.log(this.categories);
      }
    })
  }
}
