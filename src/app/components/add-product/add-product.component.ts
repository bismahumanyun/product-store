import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { StoreService } from '../../services/store.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-add-product',
  standalone: true,
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
})
export class AddProductComponent {
  productForm: FormGroup;
  submitMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private storeService: StoreService
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
      const newProduct: Partial<Product> = {
        title: this.productForm.get('title')?.value || '',
        price: this.productForm.get('price')?.value ?? 0,
        description: this.productForm.get('description')?.value || '',
        image: this.productForm.get('image')?.value || '',
        category: this.productForm.get('category')?.value || ''
      };

      this.storeService.addProduct(newProduct).subscribe({
        next: () => {
          this.submitMessage = 'Product added successfully!';
          this.productForm.reset();
        },
        error: (error) => {
          this.submitMessage = 'Failed to add product: ' + error.message;
        }
      });
    }
  }
}