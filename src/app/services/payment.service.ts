import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private _HttpClient:HttpClient) { }

  // post methods
  cashOrder(ID:string,userData:object):Observable<any>
  {
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/orders/${ID}`,{
      shippingAddress:userData
    })
  }

  onlinePay(ID:string,userData:object):Observable<any>
  {
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${ID}?url=http://localhost:3000`,
      {
        shippingAddress:userData
      }
    )
  }


  // get methods
  userOrders(ID:string):Observable<any>
  {
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${ID}`)
  }

  allOrders():Observable<any>
  {
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/orders/`)
  }
}
