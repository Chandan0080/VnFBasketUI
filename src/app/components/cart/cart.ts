import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/cart-item.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.html'
})
export class CartComponent implements OnInit {

  cartItems: CartItem[] = [];

  constructor(private cartService: CartService) { }

 ngOnInit(){

  this.cartService
      .getCart()
      .subscribe((data:any)=>{
        this.cartItems = data.items;
      });

}
  removeItem(productId:number){

  this.cartService
      .removeFromCart(productId)
      .subscribe(()=>{

        this.cartItems = this.cartItems.filter(
          item => item.productId !== productId
        );

      });

}

}