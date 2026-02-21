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
  selectedFile!: File;
  imagePreview: string | ArrayBuffer | null = null;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService
  ) {
    this.productForm = this.fb.group({
      productName: ['', [Validators.required]],
      productPrice: [0, [Validators.required, Validators.min(0)]],
      categoryId: [0, [Validators.required]],
      productDescription: ['', [Validators.required]],
      stockQuantity: [0, [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit() {
    this.loadCategories();
  }

  saveProduct() {
    // if (this.productForm.valid) {
    //   this.productService.addProducts(this.productForm.value).subscribe((response) => {
    //     console.log('Product added successfully', response);
    //     this.productForm.reset();
    //   });
    // }

    if (this.productForm.valid && this.selectedFile) {

    const formData = new FormData();

    // Append product fields
    formData.append('productName', this.productForm.get('productName')?.value);
    formData.append('productPrice', this.productForm.get('productPrice')?.value);
    formData.append('categoryId', this.productForm.get('categoryId')?.value);
    formData.append('productDescription', this.productForm.get('productDescription')?.value);
    formData.append('stockQuantity', this.productForm.get('stockQuantity')?.value);

    // Append file
    formData.append('productImage', this.selectedFile);

    this.productService.addProducts(formData).subscribe(response => {
      console.log('Product added successfully', response);
      this.productForm.reset();
    });
  } else {
    alert("Please fill all fields and select an image.");
  }
  }

  loadCategories() {
    this.categoryService.getAllCategories().subscribe((data) => {
      this.categories.set(data);
      console.log('Categories loaded:', this.categories());
    });
  }

  onFileSelected(event: any) {
  const file = event.target.files[0];

  if (!file) return;

  // Validate type
  if (file.type !== 'image/png' && file.type !== 'image/jpeg') {
    alert('Only PNG and JPEG images are allowed.');
    return;
  }

  this.selectedFile = file;

  const reader = new FileReader();
  reader.onload = () => {
    this.imagePreview = reader.result;
  };
  reader.readAsDataURL(file);
}

}
