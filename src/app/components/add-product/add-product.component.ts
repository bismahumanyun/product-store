// src/app/components/add-product/add-product.component.ts
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { StoreService } from '../../services/store.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  template: `
    <form [formGroup]="productForm" (ngSubmit)="onSubmit()">
      <mat-form-field>
        <mat-label>Title</mat-label>
        <input matInput formControlName="title">
      </mat-form-field>
      <mat-form-field>
        <mat-label>Price</mat-label>
        <input matInput type="number" formControlName="price">
      </mat-form-field>
      <mat-form-field>
        <mat-label>Description</mat-label>
        <input matInput formControlName="description">
      </mat-form-field>
      <mat-form-field>
        <mat-label>Image URL</mat-label>
        <input matInput formControlName="image">
      </mat-form-field>
      <mat-form-field>
        <mat-label>Category</mat-label>
        <input matInput formControlName="category">
      </mat-form-field>
      <button mat-raised-button color="primary" type="submit" [disabled]="productForm.invalid">
        Add Product
      </button>
    </form>
  `,
  styles: [`
    form {
      display: flex;
      flex-direction: column;
      gap: 16px;
      padding: 20px;
      max-width: 400px;
      margin: 0 auto;
    }
  `]
})
export class AddProductComponent {
  productForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private storeService: StoreService,
    private snackBar: MatSnackBar
  ) {
    this.productForm = this.fb.group({
      title: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      description: ['', Validators.required],
      image: ['', Validators.required],
      category: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.productForm.valid) {
      // Type the form value and ensure no null values
      const newProduct: Partial<Product> = {
        title: this.productForm.get('title')?.value || '',
        price: this.productForm.get('price')?.value ?? 0,
        description: this.productForm.get('description')?.value || '',
        image: this.productForm.get('image')?.value || '',
        category: this.productForm.get('category')?.value || ''
      };

      this.storeService.addProduct(newProduct).subscribe({
        next: (response) => {
          this.snackBar.open('Product added successfully!', 'Close', { duration: 3000 });
          this.productForm.reset();
        },
        error: (error) => {
          this.snackBar.open('Failed to add product: ' + error.message, 'Close', { duration: 3000 });
        }
      });
    }
  }
}