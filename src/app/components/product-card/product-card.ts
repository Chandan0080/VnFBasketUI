import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';
import { AuthService } from '../../services/auth-service.service';
import { ProductService } from '../../services/product-service';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../services/cart.service';


@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule,],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {
  @Input() product!: Product;
  role: string | null = null;
  @Output() productDeleted = new EventEmitter<number>();
  toastr = inject(ToastrService);

  constructor(private authService: AuthService, private productService: ProductService, private cartService: CartService) { }

  ngOnInit(): void {
    this.authService.role$.subscribe(role => {
      this.role = role;
    });
  }

  addToCart() {

    this.cartService
      .addToCart(this.product.productId, 1)
      .subscribe({
        next: () => console.log("Added to cart"),
        error: (err) => console.error(err)
      });

  }

  editProduct(event: Event) {
    event.stopPropagation();
    console.log('Edit clicked');
  }

  deleteProduct(event: Event) {
    event.stopPropagation();

    const confirmDelete = confirm('Are you sure you want to delete this product?');
    if (confirmDelete) {
      this.productService.deleteProductById(this.product.productId).subscribe({
        next: () => {
          this.toastr.error('Product deleted successfully!');
          this.productDeleted.emit(this.product.productId);
        },
        error: (err) => {
          console.error('Delete failed', err);
        }
      });
    }
  }

}
