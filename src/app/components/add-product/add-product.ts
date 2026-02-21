import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../services/product-service';
import { Category } from '../../models/category.model';
import { CategoryService } from '../../services/category-service';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOption } from '@angular/material/autocomplete';

@Component({
  selector: 'app-add-product',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-product.html',
  styleUrl: './add-product.css',
})
export class AddProduct {
  productForm!: FormGroup;
  categories  = signal<Category[]>([]);

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService
  ) {
    this.productForm = this.fb.group({
      productName: ['', [Validators.required]],
      productPrice: [0, [Validators.required, Validators.min(0)]],
      categoryId: [0, [Validators.required]],
      imageUrl: ['', [Validators.required]],
      productDescription: ['', [Validators.required]],
      stockQuantity: [0, [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit() {
    this.loadCategories();
  }

  saveProduct() {
    if (this.productForm.valid) {
      this.productService.addProducts(this.productForm.value).subscribe((response) => {
        console.log('Product added successfully', response);
        this.productForm.reset();
      });
    }
  }

  loadCategories() {
    this.categoryService.getAllCategories().subscribe((data) => {
      this.categories.set(data);
      console.log('Categories loaded:', this.categories());
    });
  }

}
