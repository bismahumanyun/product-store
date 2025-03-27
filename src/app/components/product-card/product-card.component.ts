// src/app/components/product-card/product-card.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
//import { Product } from '../../models/product.model.ts';
import { Product } from '../../models/product.model';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  template: `
    <mat-card>
      <img mat-card-image [src]="product.image" alt="{{product.title}}">
      <mat-card-title>{{product.title}}</mat-card-title>
      <mat-card-content>
        <p>{{product.description | slice:0:50}}...</p>
        <p>{{product.price | currency}}</p>
      </mat-card-content>
      <mat-card-actions>
        <button mat-button (click)="addToCart.emit(product)">Add to Cart</button>
      </mat-card-actions>
    </mat-card>
  `,
})
export class ProductCardComponent {
  @Input({ required: true }) product!: Product;
  @Output() addToCart = new EventEmitter<Product>();
}