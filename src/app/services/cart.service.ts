import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../models/cart-item.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private baseUrl = "http://localhost:8080/vnfbasket";

  private cartSubject = new BehaviorSubject<CartItem[]>([]);
  cart$ = this.cartSubject.asObservable();
  
 

  constructor(private http: HttpClient) {
    this.refreshCart();
  }

  refreshCart() {
  this.getCart().subscribe((data: any) => {

    const items: CartItem[] = data.items.map((item: any) => ({
      ...item,
      availableQuantity: item.availableQuantity 
    }));

    this.cartSubject.next(items);
  });
}

  getCart(){
    return this.http.get<any>(`${this.baseUrl}/getCartItems`);
  }

  addToCart(productId:number, quantity:number){
    return this.http.post(
      `${this.baseUrl}/addToCart`,
      { productId, quantity },
      { responseType: 'text' }
    );
  }

  removeFromCart(productId:number){
    return this.http.delete(
      `${this.baseUrl}/removeFromCart`,
      { body:{ productId } }
    );
  }

  updateQuantity(productId:number, quantity:number){
    return this.http.put(
      `${this.baseUrl}/updateCartItem`,
      { productId, quantity }
    );
  }

}