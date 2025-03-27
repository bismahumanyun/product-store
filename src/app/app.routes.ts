// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { CartComponent } from './components/cart/cart.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './gaurds/auth.guard';

export const routes: Routes = [
    { path: '', component: ProductListComponent },
    { path: 'cart', component: CartComponent },
    { path: 'add-product', component: AddProductComponent, canActivate: [AuthGuard] },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: '**', redirectTo: '' }
];
