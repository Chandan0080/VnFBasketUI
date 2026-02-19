import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCard } from '../product-card/product-card';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-home',
  imports: [CommonModule, ProductCard],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  products: Product[] = [];

  constructor() {
    this.loadDummyProducts();
  }

  loadDummyProducts() {
    this.products = [
      {
        id: 1,
        name: 'Fresh Tomato - Premium Quality',
        brand: 'Farm Fresh',
        image: 'https://via.placeholder.com/200?text=Tomato',
        price: 45,
        originalPrice: 60,
        isOrganic: true,
        deliveryTime: 15,
        weights: ['500g', '1kg']
      },
      {
        id: 2,
        name: 'Organic Cucumber - Pesticide Free',
        brand: 'Organic Crest',
        image: 'https://via.placeholder.com/200?text=Cucumber',
        price: 35,
        originalPrice: 50,
        isOrganic: true,
        deliveryTime: 20,
        weights: ['250g', '500g']
      },
      {
        id: 3,
        name: 'Fresh Onion - White',
        brand: 'Green Valley',
        image: 'https://via.placeholder.com/200?text=Onion',
        price: 25,
        originalPrice: 35,
        isOrganic: false,
        deliveryTime: 10,
        weights: ['500g', '1kg', '2kg']
      },
      {
        id: 4,
        name: 'Carrots - Vitamin Rich',
        brand: 'Farm Fresh',
        image: 'https://via.placeholder.com/200?text=Carrot',
        price: 40,
        originalPrice: 55,
        isOrganic: true,
        deliveryTime: 12,
        weights: ['500g', '1kg']
      },
      {
        id: 5,
        name: 'Bell Pepper - Green',
        brand: 'Nature\'s Best',
        image: 'https://via.placeholder.com/200?text=Pepper',
        price: 50,
        originalPrice: 70,
        isOrganic: true,
        deliveryTime: 18,
        weights: ['250g', '500g']
      },
      {
        id: 6,
        name: 'Broccoli - Fresh',
        brand: 'Green Valley',
        image: 'https://via.placeholder.com/200?text=Broccoli',
        price: 55,
        originalPrice: 75,
        isOrganic: true,
        deliveryTime: 20,
        weights: ['500g']
      },
      {
        id: 7,
        name: 'Spinach - Leafy Green',
        brand: 'Organic Crest',
        image: 'https://via.placeholder.com/200?text=Spinach',
        price: 30,
        originalPrice: 45,
        isOrganic: true,
        deliveryTime: 15,
        weights: ['250g', '500g']
      },
      {
        id: 8,
        name: 'Potato - Red',
        brand: 'Nature\'s Best',
        image: 'https://via.placeholder.com/200?text=Potato',
        price: 20,
        originalPrice: 30,
        isOrganic: false,
        deliveryTime: 10,
        weights: ['1kg', '2kg']
      },
      {
        id: 9,
        name: 'Capsicum - Red',
        brand: 'Farm Fresh',
        image: 'https://via.placeholder.com/200?text=Capsicum',
        price: 60,
        originalPrice: 85,
        isOrganic: true,
        deliveryTime: 22,
        weights: ['250g', '500g']
      },
      {
        id: 10,
        name: 'Garlic - Fresh Bulbs',
        brand: 'Green Valley',
        image: 'https://via.placeholder.com/200?text=Garlic',
        price: 35,
        originalPrice: 50,
        isOrganic: false,
        deliveryTime: 12,
        weights: ['100g', '250g']
      },
      {
        id: 11,
        name: 'Ginger - Fresh Root',
        brand: 'Organic Crest',
        image: 'https://via.placeholder.com/200?text=Ginger',
        price: 40,
        originalPrice: 60,
        isOrganic: false,
        deliveryTime: 15,
        weights: ['100g', '250g']
      },
      {
        id: 12,
        name: 'Corn - Fresh Sweet',
        brand: 'Nature\'s Best',
        image: 'https://via.placeholder.com/200?text=Corn',
        price: 25,
        originalPrice: 35,
        isOrganic: true,
        deliveryTime: 18,
        weights: ['500g']
      },
      {
        id: 13,
        name: 'Bitter Gourd - Fresh',
        brand: 'Farm Fresh',
        image: 'https://via.placeholder.com/200?text=BitterGourd',
        price: 45,
        originalPrice: 65,
        isOrganic: true,
        deliveryTime: 20,
        weights: ['500g']
      },
      {
        id: 14,
        name: 'Cauliflower - Fresh',
        brand: 'Green Valley',
        image: 'https://via.placeholder.com/200?text=Cauliflower',
        price: 50,
        originalPrice: 70,
        isOrganic: false,
        deliveryTime: 18,
        weights: ['500g', '1kg']
      },
      {
        id: 15,
        name: 'Cabbage - Green',
        brand: 'Organic Crest',
        image: 'https://via.placeholder.com/200?text=Cabbage',
        price: 20,
        originalPrice: 30,
        isOrganic: false,
        deliveryTime: 12,
        weights: ['500g', '1kg']
      },
      {
        id: 16,
        name: 'Pumpkin - Fresh',
        brand: 'Nature\'s Best',
        image: 'https://via.placeholder.com/200?text=Pumpkin',
        price: 35,
        originalPrice: 50,
        isOrganic: true,
        deliveryTime: 20,
        weights: ['500g', '1kg']
      },
      {
        id: 17,
        name: 'Radish - White',
        brand: 'Farm Fresh',
        image: 'https://via.placeholder.com/200?text=Radish',
        price: 18,
        originalPrice: 28,
        isOrganic: false,
        deliveryTime: 10,
        weights: ['500g']
      },
      {
        id: 18,
        name: 'Beans - Green',
        brand: 'Green Valley',
        image: 'https://via.placeholder.com/200?text=Beans',
        price: 55,
        originalPrice: 75,
        isOrganic: true,
        deliveryTime: 22,
        weights: ['500g']
      },
      {
        id: 19,
        name: 'Mushroom - Fresh Button',
        brand: 'Organic Crest',
        image: 'https://via.placeholder.com/200?text=Mushroom',
        price: 65,
        originalPrice: 90,
        isOrganic: true,
        deliveryTime: 25,
        weights: ['250g', '500g']
      },
      {
        id: 20,
        name: 'Lemon - Fresh Citrus',
        brand: 'Nature\'s Best',
        image: 'https://via.placeholder.com/200?text=Lemon',
        price: 30,
        originalPrice: 45,
        isOrganic: true,
        deliveryTime: 15,
        weights: ['500g', '1kg']
      }
    ];
  }
}
