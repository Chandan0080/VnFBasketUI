import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  public apiUrl: string = 'http://localhost:8080/vnfbasket';
  private http = inject(HttpClient);
  private token: string | null = sessionStorage.getItem('token');

  addProducts(product: Product): Observable<Product>{
    const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.token}` };
    return this.http.post<Product>(this.apiUrl + '/addProduct', product, { headers });
  }

  getAllProducts(): Observable<Product[]> {
    const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.token}` };
    return this.http.get<Product[]>(this.apiUrl + '/getAllProducts', { headers });
  }
  
}
