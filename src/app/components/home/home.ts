import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCard } from '../product-card/product-card';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product-service';

@Component({
  selector: 'app-home',
  imports: [CommonModule, ProductCard],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  products = signal<Product[]>([]);

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.getAllProducts();
  }

  getAllProducts() {
    this.productService.getAllProducts().subscribe((data) => {
      this.products.set(data);
      console.log('Products loaded:', this.products());
    });
    
  }
}



  

