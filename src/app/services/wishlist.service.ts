import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  baseUrl:string=`https://ecommerce.routemisr.com/api/v1/wishlist`;
  constructor(private _HttpClient:HttpClient) { }
  // wishProp
  wishItems:BehaviorSubject<number>=new BehaviorSubject(1);
  // get wishlist
  addTOWIsh(ID:string):Observable<any>
  {
    return this._HttpClient.post(`${this.baseUrl}`,
      {
        productId: ID,
    }
    )
  }
  removeFromWish(ID:string):Observable<any>
  {
    return this._HttpClient.delete(`${this.baseUrl}/${ID}`)
  }
  loggedWish():Observable<any>
  {
    return this._HttpClient.get(`${this.baseUrl}`)
  }
}
