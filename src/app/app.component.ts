import { Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from './services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialogComponent } from './components/login-dialog/login-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductListComponent } from './components/product-list/product-list.component';
import { CartComponent } from './components/cart/cart.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { AuthGuard } from './gaurds/auth.guard';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule,
    ProductListComponent,
    CartComponent,
    DashboardComponent,
    AddProductComponent,
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule,
    RouterModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    public authService: AuthService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  openLoginDialog() {
    const dialogRef = this.dialog.open(LoginDialogComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const { username, password } = result;
        this.authService.login(username, password).subscribe({
          next: (response) => {
            localStorage.setItem('token', response.token); // Store the token in localStorage
            this.snackBar.open('Login successful!', 'Close', { duration: 3000 });
          },
          error: () => {
            this.snackBar.open('Invalid username or password', 'Close', { duration: 3000 });
          }
        });
      }
    });
  }
}

const routes: Routes = [
  { path: '', component: ProductListComponent },
  { path: 'cart', component: CartComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'add-product', component: AddProductComponent, canActivate: [AuthGuard] },
];
