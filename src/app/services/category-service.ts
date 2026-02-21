import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  public apiUrl: string = 'http://localhost:8080/vnfbasket';
  private http = inject(HttpClient);
  private token: string | null = sessionStorage.getItem('token');
  
  getAllCategories(): Observable<Category[]> {
    const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.token}` };
    
    return this.http.get<Category[]>(this.apiUrl+"/getAllCategories", { headers });
  }
}
