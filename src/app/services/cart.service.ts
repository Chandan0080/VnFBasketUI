import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CartItem } from '../models/cart-item.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private baseUrl = "http://localhost:8080/vnfbasket";

  constructor(private http: HttpClient) {}

  addToCart(productId:number, quantity:number){

  return this.http.post(
    `${this.baseUrl}/addToCart`,
    { productId, quantity },
    { responseType: 'text' }
  );

}

  getCart(){
  return this.http.get<CartItem[]>(`${this.baseUrl}/getCartItems`);
}

  removeFromCart(productId:number){

    return this.http.delete(`${this.baseUrl}/removeFromCart`,{
      body:{productId:productId}
    });

  }

  updateCart(productId:number, quantity:number){

    return this.http.put(`${this.baseUrl}/updateCartItem`,{
      productId:productId,
      quantity:quantity
    });

  }

}