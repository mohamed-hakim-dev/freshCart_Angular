import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DetailsService {
  baseUrl:string='https://ecommerce.routemisr.com';
  constructor(private http:HttpClient) { }
  getDetails(ID:string):Observable<any>
  {
    return this.http.get(`${this.baseUrl}/api/v1/products/${ID}`)
  }
}
