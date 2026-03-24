import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/cart-item.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';



@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class CartComponent implements OnInit {

  cartItems: CartItem[] = [];


  constructor(private cartService: CartService, private cdr: ChangeDetectorRef, private router: Router) { }

  goHome() {
    this.router.navigate(['/']);
  }
  totalAmount = 0;

  triggerAnimation(item: any) {
    item.animate = true;

    setTimeout(() => {
      item.animate = false;
    }, 200);
  }

  ngOnInit() {
    this.cartService.cart$.subscribe(items => {
      this.cartItems = items;
      this.calculateTotal();
    });
    this.cartService.refreshCart();
  }

  increase(item: CartItem) {
    this.triggerAnimation(item);
    if (item.quantity >= item.availableQuantity) {
      return;
    }

    this.cartService
      .updateQuantity(item.productId, item.quantity + 1)
      .subscribe(() => {
        this.cartService.refreshCart();
      });
  }

  decrease(item: any) {
    this.triggerAnimation(item);
    if (item.quantity === 1) {
      this.cartService
        .removeFromCart(item.productId)
        .subscribe(() => {
          this.cartService.refreshCart();
        });
    } else {
      this.cartService
        .updateQuantity(item.productId, item.quantity - 1)
        .subscribe(() => {
          this.cartService.refreshCart();
        });
    }
  }

  removeItem(productId: number) {
    this.cartService
      .removeFromCart(productId)
      .subscribe(() => {
        this.cartService.refreshCart();
        this.cdr.detectChanges();
      });
  }

  trackById(index: number, item: any) {
    return item.productId;
  }

  calculateTotal() {
    this.totalAmount = this.cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
    this.cdr.detectChanges();
  }

  

}