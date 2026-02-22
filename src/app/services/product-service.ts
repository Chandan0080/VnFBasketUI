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

  addProducts(productformData: FormData): Observable<Product>{
    return this.http.post<Product>(this.apiUrl + '/addProduct', productformData);
  }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl + '/getAllProducts');
  }
  
}
