import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http:HttpClient) { }
baseUrl:string='https://ecommerce.routemisr.com';
searchTerm:string='';
  getHomeData():Observable<any>
  {
    return this.http.get(`${this.baseUrl}/api/v1/products`);
  }
}
