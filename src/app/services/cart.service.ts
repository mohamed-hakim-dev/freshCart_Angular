import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor(private _HttpClient:HttpClient) { }

  userToken:any=localStorage.getItem('_token');

  // add to cart method
  toCart(prodID:string):Observable<any>
  {
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/cart`,{
      productId:prodID
    })
  }
  // get logged cart
  loggedCart():Observable<any>
  {
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/cart`)
  }
  // update items count
  updateQuantity(prodID:string,prodCount:number):Observable<any>
  {
    return this._HttpClient.put(`https://ecommerce.routemisr.com/api/v1/cart/${prodID}`,{
      count:prodCount
    })
  }
  removeItem(prodID:string):Observable<any>
  {
    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart/${prodID}`)
  }
  clearCart():Observable<any>
  {
    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart`)
  }
}
