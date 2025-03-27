// src/app/services/store.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Product } from '../models/product.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class StoreService {
  private apiUrl = 'https://fakestoreapi.com/products';
  cartItems = signal<Product[]>([]);

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  addToCart(product: Product) {
    this.cartItems.update(items => [...items, product]);
  }

  addProduct(product: Partial<Product>): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }
}