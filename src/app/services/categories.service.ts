import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  baseUrl:string=`https://ecommerce.routemisr.com`;
  constructor(private http:HttpClient){}
  getAllCategories():Observable<any>
  {
    return this.http.get(`${this.baseUrl}/api/v1/categories`);
  }
  getSpecificCategory(id:string):Observable<any>
  {
    return this.http.get(`${this.baseUrl}/api/v1/categories/${id}`);
  }
  getSpecificSubCategories(ID:string):Observable<any>
  {
    return this.http.get(`${this.baseUrl}/api/v1/categories/${ID}/subcategories`);
  }
}
