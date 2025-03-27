// src/app/components/product-list/product-list.component.ts
import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../services/store.service';
import { Product } from '../../models/product.model';
import { ProductCardComponent } from '../product-card/product-card.component';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ProductCardComponent, MatGridListModule],
  template: `
    <mat-grid-list cols="3" rowHeight="300px" gutterSize="20px">
      @for (product of products; track product.id) {
        <mat-grid-tile>
          <app-product-card 
            [product]="product"
            (addToCart)="handleAddToCart($event)">
          </app-product-card>
        </mat-grid-tile>
      } @empty {
        <mat-grid-tile>Loading...</mat-grid-tile>
      }
    </mat-grid-list>
  `,
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(private storeService: StoreService) { }

  ngOnInit() {
    this.storeService.getProducts().subscribe(products => {
      this.products = products;
    });
  }

  handleAddToCart(product: Product) {
    this.storeService.addToCart(product);
  }
}