// src/app/components/cart/cart.component.ts
import { Component, computed } from '@angular/core';
import { StoreService } from '../../services/store.service';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, MatListModule],
  template: `
    <h2>Shopping Cart</h2>
    <mat-list>
      @for (item of cartItems(); track item.id) {
        <mat-list-item>
          {{item.title}} - {{item.price | currency}}
        </mat-list-item>
      } @empty {
        <mat-list-item>Cart is empty</mat-list-item>
      }
    </mat-list>
    <p>Total: {{totalPrice() | currency}}</p>
  `,
})
export class CartComponent {
  cartItems;
  totalPrice;

  constructor(private storeService: StoreService) {
    this.cartItems = this.storeService.cartItems;
    this.totalPrice = computed(() =>
      this.cartItems().reduce((sum, item) => sum + item.price, 0)
    );
  }
}